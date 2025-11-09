import express from "express";
import {
    createProject,
    getAllProjects,
    getProjectByName,
    updateProject,
    deleteProject,
    addSectionAnswers,
    getProjectsByUserEmail, // 👈 importar el nuevo controlador
} from "../controllers/ProjectController.js";

const router = express.Router();

router.post("/", createProject);
router.get("/", getAllProjects);
router.get("/:name", getProjectByName);
router.put("/:name", updateProject);
router.delete("/:name", deleteProject);
router.post("/:projectName/answers", addSectionAnswers);
router.get("/user/:email", getProjectsByUserEmail);

export default router;
