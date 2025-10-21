import Project from "../models/Project.js";
import User from "../models/Users.js";

/**
 * Crear un nuevo proyecto con testers opcionales
 */
export const createProject = async (req, res) => {
    try {
        const { name, URL, description, complexity, creatorEmail, testersEmails = [] } = req.body;

        // Validar campos obligatorios
        if (!name || !URL || !description || !complexity || !creatorEmail) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        // Buscar o crear el usuario creador
        let creator = await User.findOne({ id: creatorEmail });
        if (!creator) {
            creator = new User({
                id: creatorEmail,
                password: "",
                name: "Invitado",
                projects: [],
                testing: []
            });
            await creator.save();
        }

        // Crear el proyecto
        const newProject = new Project({
            name,
            URL,
            description,
            complexity,
            creator: creator.id, // guardamos email
            testers: []
        });

        // Procesar testers
        for (const email of testersEmails) {
            // Siempre agregamos al proyecto
            newProject.testers.push({ id: email, answers: [] });

            // Si el usuario existe, actualizar su arreglo testing
            const tester = await User.findOne({ id: email });
            if (tester) {
                tester.testing.push(newProject.name);
                await tester.save();
            }
        }

        // Guardar el proyecto
        await newProject.save();

        // Asociar el proyecto al creador
        creator.projects.push(newProject.name);
        await creator.save();

        res.status(201).json({
            message: "Proyecto creado correctamente",
            project: newProject,
        });
    } catch (error) {
        console.error("❌ Error al crear proyecto:", error);
        res.status(500).json({ message: "Error al crear proyecto", error: error.message });
    }
};

/**
 * Obtener todos los proyectos
 */
export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener proyectos", error });
    }
};

/**
 * Obtener un proyecto por su ID
 */
export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: "Proyecto no encontrado" });
        res.status(200).json(project);
    } catch (error) {
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

        // Eliminar la referencia del creador (por email)
        await User.updateOne({ id: project.creator }, { $pull: { projects: project.name } });

        // Eliminar la referencia del proyecto en testers
        for (const tester of project.testers) {
            await User.updateOne({ id: tester.id }, { $pull: { testing: project.name } });
        }

        // Eliminar el proyecto
        await Project.findByIdAndDelete(id);

        res.status(200).json({ message: "Proyecto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar proyecto", error });
    }
};
