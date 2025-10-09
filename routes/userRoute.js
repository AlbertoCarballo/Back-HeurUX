import express from "express";
import { obtenerUsuarios, crearUsuario, eliminarUsuario } from "../controllers/userController.js";

const router = express.Router();

// Obtener todos los usuarios
router.get("/", obtenerUsuarios);

// Crear un nuevo usuario
router.post("/", crearUsuario);

// Eliminar un usuario por ID
router.delete("/:id", eliminarUsuario);

export default router;
