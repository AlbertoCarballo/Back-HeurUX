import express from "express";
import {
  obtenerUsuarios,
  obtenerUsuarioPorEmail,
  crearUsuario,
  eliminarUsuarioPorEmail,
  loginUsuario,
  verifyUsuario,
  logoutUsuario,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/Auth.js";

const router = express.Router();

// ✅ Primero las rutas específicas
router.post("/login", loginUsuario);
router.get("/verify", authMiddleware, verifyUsuario);
router.post("/logout", logoutUsuario);

// 🧭 Luego las rutas genéricas
router.get("/", obtenerUsuarios);
router.get("/:email", obtenerUsuarioPorEmail);
router.post("/", crearUsuario);
router.delete("/:email", eliminarUsuarioPorEmail);
router.get("/perfil", authMiddleware, obtenerUsuarioPorEmail);

export default router;
