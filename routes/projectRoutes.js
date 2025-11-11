import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectByName,
  updateProject,
  deleteProject,
  addSectionAnswers,
  getProjectsByUserEmail, // 👈 importar el nuevo controlador
} from "../controllers/projectController.js";
import { authMiddleware } from "../middleware/Auth.js";

const router = express.Router();

router.post("/", authMiddleware, createProject);
router.get("/", getAllProjects);
router.get("/:name", getProjectByName);
router.put("/:name", updateProject);
router.delete("/:name", deleteProject);
router.post("/:projectName/answers", addSectionAnswers);
router.get("/user/:email", getProjectsByUserEmail);

export default router;
