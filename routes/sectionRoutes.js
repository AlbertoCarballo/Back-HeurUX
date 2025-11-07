import express from "express";
import { seedSections, getSections } from "../controllers/sectionController.js";

const router = express.Router();

// Insertar las secciones (sembrar)
router.post("/seed", seedSections);

// Obtener todas las secciones
router.get("/", getSections);

export default router;
