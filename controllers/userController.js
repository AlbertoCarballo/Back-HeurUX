import User from "../models/Users.js";
import Project from "../models/Project.js";

// ✅ Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await User.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener usuarios", error: error.message });
    }
};

// ✅ Obtener un usuario por email
export const obtenerUsuarioPorEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const usuario = await User.findOne({ id: email });

        if (!usuario) {
            return res.status(404).json({ mensaje: "⚠️ Usuario no encontrado" });
        }

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al buscar usuario", error: error.message });
    }
};

// ✅ Crear un nuevo usuario
export const crearUsuario = async (req, res) => {
    try {
        const { id, password, name } = req.body;

        const nuevoUsuario = new User({
            id,
            password,
            name,
            projects: [],
            testing: []
        });

        await nuevoUsuario.save();

        // 🔄 Actualizar proyectos donde estaba como tester invitado
        const proyectos = await Project.find({ "testers.id": id });
        for (const proyecto of proyectos) {
            if (!nuevoUsuario.testing.includes(proyecto.name)) {
                nuevoUsuario.testing.push(proyecto.name);
            }
        }

        await nuevoUsuario.save();

        res.status(201).json({ mensaje: "Usuario creado correctamente", usuario: nuevoUsuario });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear usuario", error: error.message });
    }
};
export const loginUsuario = async (req, res) => {
    try {
        const { id, password } = req.body;

        if (!id || !password) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        // Buscar usuario por email
        const usuario = await User.findOne({ id });
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Verificar contraseña
        if (usuario.password !== password) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        // ✅ Login exitoso
        res.status(200).json({
            message: "Login exitoso",
            usuario: {
                id: usuario.id,
                name: usuario.name,
                projects: usuario.projects,
                testing: usuario.testing,
            },
        });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ message: "Error en login", error: error.message });
    }
};


// ✅ Eliminar usuario por email
export const eliminarUsuarioPorEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const usuarioEliminado = await User.findOneAndDelete({ id: email });

        if (!usuarioEliminado) {
            return res.status(404).json({ mensaje: "⚠️ Usuario no encontrado" });
        }

        res.json({ mensaje: `🗑️ Usuario ${email} eliminado correctamente` });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar usuario", error: error.message });
    }
};
