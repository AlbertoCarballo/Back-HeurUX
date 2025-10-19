import express from "express";
import {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();

router.post("/", createProject);            // Crear proyecto
router.get("/", getAllProjects);            // Obtener todos los proyectos
router.get("/:id", getProjectById);         // Obtener uno
router.put("/:id", updateProject);          // Actualizar
router.delete("/:id", deleteProject);       // Eliminar

export default router;
