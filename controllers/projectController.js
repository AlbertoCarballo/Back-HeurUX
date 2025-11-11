import Project from "../models/Project.js";
import User from "../models/Users.js";
import { sendInvitationEmail } from "./emailController.js";
/**
 * Crear un nuevo proyecto con testers opcionales
 */
export const createProject = async (req, res) => {
  try {
    const userId = req.user?.id; // ✅ viene del JWT

    if (!userId) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    const { name, URL, description, complexity, testersEmails = [] } = req.body;

    if (!name || !URL || !description || !complexity) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    // ✅ Buscar creador
    const creator = await User.findOne({ id: userId });
    if (!creator) {
      return res.status(404).json({ message: "Usuario creador no encontrado" });
    }

    // ✅ Crear proyecto
    const newProject = new Project({
      name,
      URL,
      description,
      complexity,
      creator: userId,
      testers: testersEmails.map((email) => ({ id: email, answers: [] })),
    });

    await newProject.save();

    // ✅ Guardar proyecto en el usuario creador
    if (!creator.projects.includes(newProject.name)) {
      creator.projects.push(newProject.name);
      await creator.save(); // 👈 faltaba guardar siempre aquí
    }

    const friendsToAdd = [];

    // ✅ Manejo de testers
    for (const email of testersEmails) {
      let tester = await User.findOne({ id: email });

      const testerExists = !!tester;

      if (!tester) {
        tester = new User({
          id: email,
          name: "Invitado",
          password: undefined, // evita error mongoose
          needsRegistration: true,
          projects: [],
          testing: [],
          friends: [],
        });
        await tester.save();
      }

      // Agregar proyecto como tester
      if (!tester.testing.includes(newProject.name)) {
        tester.testing.push(newProject.name);
        await tester.save();
      }

      // Agregar amistad
      if (!tester.friends.includes(userId)) {
        tester.friends.push(userId);
        await tester.save();
      }

      // Agregar amistad al creador después
      if (!creator.friends.includes(email)) {
        friendsToAdd.push(email);
      }

      // ✅ Link segun exista o no
      const inviteLink = testerExists
        ? `${process.env.FRONTEND_URL}/login?project=${newProject._id}`
        : `${process.env.FRONTEND_URL}/register?invite=${newProject._id}&email=${email}`;

      // ✅ Enviar correo
      await sendInvitationEmail(email, creator.name, inviteLink);
    }

    // ✅ Guardar amistades del creador al final
    if (friendsToAdd.length > 0) {
      creator.friends.push(...friendsToAdd);
      await creator.save();
    }

    return res.status(201).json({
      message: "✅ Proyecto creado correctamente",
      project: newProject,
    });
  } catch (error) {
    console.error("❌ Error al crear proyecto (backend):", error);
    return res.status(500).json({
      message: "Error al crear proyecto",
      error: error.message,
    });
  }
};

/**
 * Obtener todos los proyectos
 */
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .sort({ createdAt: -1 }) // 🆕 ordenar por últimos creados
      .lean(); // opcional pero hace la query más rápida

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    console.error("❌ Error obteniendo proyectos:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener proyectos",
      error: error.message,
    });
  }
};

/**
 * Obtener un proyecto por nombre
 */
export const getProjectByName = async (req, res) => {
  try {
    const { name } = req.params;
    const project = await Project.findOne({ name });
    if (!project)
      return res.status(404).json({ message: "Proyecto no encontrado" });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener proyecto", error });
  }
};

/**
 * Actualizar un proyecto por nombre
 */
export const updateProject = async (req, res) => {
  try {
    const { name } = req.params;
    const { URL, description, complexity } = req.body;

    const updatedProject = await Project.findOneAndUpdate(
      { name },
      { URL, description, complexity },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    res.status(200).json({
      message: "Proyecto actualizado correctamente",
      project: updatedProject,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar proyecto", error });
  }
};

/**
 * Eliminar un proyecto por nombre
 */
export const deleteProject = async (req, res) => {
  try {
    const { name } = req.params;
    const project = await Project.findOne({ name });
    if (!project)
      return res.status(404).json({ message: "Proyecto no encontrado" });

    await User.updateOne(
      { id: project.creator },
      { $pull: { projects: project.name } }
    );

    for (const tester of project.testers) {
      await User.updateOne(
        { id: tester.id },
        { $pull: { testing: project.name } }
      );
    }

    await Project.deleteOne({ name });

    res.status(200).json({ message: "Proyecto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar proyecto", error });
  }
};

/**
 * Registrar respuestas de una sección por nombre del proyecto
 * Recibe:
 *  - projectName (en params)
 *  - testerEmail
 *  - section (1–15)
 *  - answers: ["si", "no", "neither"]
 *  - descriptions: ["texto1", "texto2", ...]
 */
export const addSectionAnswers = async (req, res) => {
  try {
    const { projectName } = req.params;
    const { testerEmail, section, answers, descriptions } = req.body;

    if (!testerEmail || !section || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    const project = await Project.findOne({ name: projectName });
    if (!project)
      return res.status(404).json({ message: "Proyecto no encontrado" });

    const tester = project.testers.find((t) => t.id === testerEmail);
    if (!tester) {
      return res
        .status(404)
        .json({ message: "Tester no encontrado en este proyecto" });
    }

    // Convertir respuestas a números
    const numericAnswers = answers.map((resp) => {
      switch (resp.toLowerCase()) {
        case "si":
          return 1;
        case "no":
          return 0;
        case "neither":
          return 0.5;
        default:
          return 0;
      }
    });

    const sectionKey = `section${section}`;
    const descKey = `description${section}`;

    if (!tester.answers.length) tester.answers.push({});

    let respuesta = tester.answers[0];
    respuesta[sectionKey] = numericAnswers;
    respuesta[descKey] = descriptions || [];

    // Calcular resultado total
    const total = numericAnswers.reduce((acc, val) => acc + val, 0);

    if (!respuesta.results) respuesta.results = [];
    respuesta.results.push(total);

    // Calcular promedio general
    const promedio =
      respuesta.results.reduce((a, b) => a + b, 0) / respuesta.results.length;
    respuesta.average = Number(promedio.toFixed(2));

    await project.save();

    res.status(200).json({
      message: `Sección ${section} guardada correctamente`,
      tester: testerEmail,
      results: respuesta.results,
      average: respuesta.average,
    });
  } catch (error) {
    console.error("❌ Error al guardar sección:", error);
    res
      .status(500)
      .json({ message: "Error al guardar respuestas", error: error.message });
  }
};
/**
 * Obtener todos los proyectos creados por un usuario específico (por email)
 */
export const getProjectsByUserEmail = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ message: "Debe proporcionar un email" });
    }

    // Buscar el usuario por su ID (que usas como correo)
    const user = await User.findOne({ id: email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Buscar los proyectos donde el creador sea este usuario
    const projects = await Project.find({ creator: user.id });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    console.error("❌ Error al obtener proyectos del usuario:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener proyectos del usuario",
      error: error.message,
    });
  }
};
