import express from "express";
import {
    createProject,
    getAllProjects,
    getProjectByName,
    updateProject,
    deleteProject,
    addSectionAnswers
} from "../controllers/projectController.js";

const router = express.Router();

// Crear un proyecto
router.post("/", createProject);

// Obtener todos los proyectos
router.get("/", getAllProjects);

// Obtener un proyecto por nombre
router.get("/:name", getProjectByName);

// Actualizar un proyecto por nombre
router.put("/:name", updateProject);

// Eliminar un proyecto por nombre
router.delete("/:name", deleteProject);

// Registrar respuestas de una sección
router.post("/:projectName/section", addSectionAnswers);

export default router;
