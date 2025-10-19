import Project from "../models/Project.js";
import User from "../models/Users.js";

/**
 * Crear un nuevo proyecto y asociarlo al usuario creador
 */
export const createProject = async (req, res) => {
    try {
        const { name, URL, description, complexity, creatorId } = req.body;

        // Validar datos
        if (!name || !URL || !description || !complexity || !creatorId) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        // Verificar que el usuario exista
        const user = await User.findById(creatorId);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Crear el proyecto
        const newProject = new Project({
            name,
            URL,
            description,
            complexity,
            creator: user._id,
        });

        // Guardar en la base de datos
        const savedProject = await newProject.save();

        // Asociar el proyecto al usuario
        user.projects.push(savedProject._id);
        await user.save();

        res.status(201).json({
            message: "Proyecto creado exitosamente",
            project: savedProject,
        });
    } catch (error) {
        console.error("Error al crear proyecto:", error);
        res.status(500).json({ message: "Error al crear proyecto", error });
    }
};

/**
 * Obtener todos los proyectos
 */
export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate("creator", "name id");
        res.status(200).json(projects);
    } catch (error) {
        console.error("Error al obtener proyectos:", error);
        res.status(500).json({ message: "Error al obtener proyectos", error });
    }
};

/**
 * Obtener un proyecto por su ID
 */
export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate("creator", "name id");
        if (!project) return res.status(404).json({ message: "Proyecto no encontrado" });
        res.status(200).json(project);
    } catch (error) {
        console.error("Error al obtener proyecto:", error);
        res.status(500).json({ message: "Error al obtener proyecto", error });
    }
};

/**
 * Actualizar un proyecto por ID
 */
export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, URL, description, complexity } = req.body;

        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { name, URL, description, complexity },
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
        console.error("Error al actualizar proyecto:", error);
        res.status(500).json({ message: "Error al actualizar proyecto", error });
    }
};

/**
 * Eliminar un proyecto y removerlo del usuario creador
 */
export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findById(id);
        if (!project) return res.status(404).json({ message: "Proyecto no encontrado" });

        // Eliminar la referencia del usuario
        await User.findByIdAndUpdate(project.creator, {
            $pull: { projects: project._id },
        });

        // Eliminar el proyecto
        await Project.findByIdAndDelete(id);

        res.status(200).json({ message: "Proyecto eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar proyecto:", error);
        res.status(500).json({ message: "Error al eliminar proyecto", error });
    }
};
