import User from "../models/Users.js";
import Project from "../models/Project.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; // (opcional futura encriptación)
import { sendInvitationEmail } from "./emailController.js";
// Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener usuarios", error: error.message });
  }
};
export const informacionUsuario = async (req, res) => {
  try {
    console.log("➡️ obtenerUsuarioActual: req.user =", req.user);

    const userId = req.user?.id;
    if (!userId) {
      console.log("⚠️ obtenerUsuarioActual: no hay req.user.id");
      return res
        .status(401)
        .json({ message: "Token inválido o usuario no autenticado" });
    }

    // Buscar tolerante a mayúsculas (por si guardaste el id en minúsculas)
    const usuario = await User.findOne({
      id: new RegExp(`^${userId}$`, "i"),
    }).select("-password");
    console.log("🔎 obtenerUsuarioActual: usuario encontrado =>", usuario);

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    console.error("❌ Error en obtenerUsuarioActual:", error);
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

export const getFriends = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ message: "No autenticado" });

    const user = await User.findOne({ id: userId });

    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    // Buscar info de cada amigo
    const friends = await User.find({ id: { $in: user.friends } })
      .select("id name")
      .lean();

    res.status(200).json({ friends });
  } catch (error) {
    console.error("❌ Error al obtener amigos:", error);
    res.status(500).json({ message: "Error interno", error: error.message });
  }
};

// Obtener usuario por email
export const obtenerUsuarioPorEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const usuario = await User.findOne({ id: email });

    if (!usuario) {
      return res.status(404).json({ mensaje: "⚠️ Usuario no encontrado" });
    }

    res.status(200).json(usuario);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al buscar usuario", error: error.message });
  }
};

// Crear usuario
export const crearUsuario = async (req, res) => {
  try {
    const { id, password, name, profession, dob, experiences, phone, grades } =
      req.body;

    if (!id || !password || !name) {
      return res
        .status(400)
        .json({ mensaje: "Faltan campos obligatorios (id, password o name)" });
    }

    const existente = await User.findOne({ id });
    if (existente) {
      return res
        .status(409)
        .json({ mensaje: "⚠️ Ya existe un usuario con ese email" });
    }

    // const hashedPass = await bcrypt.hash(password, 10); // (cuando lo actives)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const nuevoUsuario = new User({
      id,
      password: hashedPassword, // ← guardas el hash
      name,
      dob: dob || null,
      profession: profession || "",
      experiences: experiences || [],
      phone: phone ? [phone] : [],
      grades: grades || [],
      projects: [],
      testing: [],
    });

    await nuevoUsuario.save();

    // Vincular si ya estaba invitado a proyectos
    const proyectos = await Project.find({ "testers.id": id });
    for (const proyecto of proyectos) {
      if (!nuevoUsuario.testing.includes(proyecto.name)) {
        nuevoUsuario.testing.push(proyecto.name);
      }
    }
    await nuevoUsuario.save();

    res.status(201).json({
      mensaje: "✅ Usuario creado correctamente",
      usuario: {
        id: nuevoUsuario.id,
        name: nuevoUsuario.name,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al crear usuario", error: error.message });
  }
};

// LOGIN
export const loginUsuario = async (req, res) => {
  try {
    const { id, password } = req.body;
    const usuario = await User.findOne({ id: new RegExp(`^${id}$`, "i") });

    if (!usuario)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const validPass = await bcrypt.compare(password, usuario.password);
    if (!validPass)
      return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: usuario.id, name: usuario.name },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 2 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "✅ Login exitoso",
      token,
      usuario: { id: usuario.id, name: usuario.name },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error en login", error: error.message });
  }
};

// VERIFY
export const verifyUsuario = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      message: "✅ Token válido",
      usuario: user,
    });
  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};

// LOGOUT
export const logoutUsuario = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  return res.status(200).json({ message: "✅ Sesión cerrada" });
};

// Eliminar usuario
export const eliminarUsuarioPorEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const usuarioEliminado = await User.findOneAndDelete({ id: email });

    if (!usuarioEliminado) {
      return res.status(404).json({ mensaje: "⚠️ Usuario no encontrado" });
    }

    res.json({ mensaje: `🗑️ Usuario ${email} eliminado correctamente` });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al eliminar usuario", error: error.message });
  }
};

export const inviteFriend = async (req, res) => {
  try {
    const userId = req.user?.id; // Usuario autenticado (del JWT)
    const { friendEmail } = req.body;

    if (!userId || !friendEmail) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    // Verificar si existe el usuario invitador
    const inviter = await User.findOne({ id: userId });
    if (!inviter)
      return res.status(404).json({ message: "Usuario no encontrado" });

    // Verificar si ya existe el invitado
    let friend = await User.findOne({ id: friendEmail });
    const friendExists = !!friend;

    if (!friend) {
      friend = new User({
        id: friendEmail,
        name: "Invitado",
        password: "TEMP_INVITE_PASSWORD",
        needsRegistration: true,
        projects: [],
        testing: [],
        friends: [],
      });
      await friend.save();
    }

    // ✅ Agregar amistad (pendiente si invitado nuevo)
    if (!friend.friends.includes(userId)) {
      friend.friends.push(userId);
      await friend.save();
    }

    if (!inviter.friends.includes(friendEmail)) {
      inviter.friends.push(friendEmail);
      await inviter.save();
    }

    // ✅ link de invitación
    const inviteLink = friendExists
      ? `${process.env.FRONTEND_URL}/login?addfriend=${userId}`
      : `${process.env.FRONTEND_URL}/register?friend=${userId}&email=${friendEmail}`;

    // ✅ enviar correo
    await sendInvitationEmail(
      friendEmail,
      inviter.name || "Un usuario de HeurUX",
      inviteLink
    );

    res.status(200).json({
      message: "✅ Invitación enviada correctamente",
    });
  } catch (error) {
    console.error("❌ Error invitando amigo:", error);
    res.status(500).json({ message: "Error al invitar amigo" });
  }
};
