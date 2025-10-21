import express from "express";
import {
    obtenerUsuarios,
    obtenerUsuarioPorEmail,
    crearUsuario,
    eliminarUsuarioPorEmail,
    loginUsuario     // <- importamos la función de login
} from "../controllers/userController.js";

const router = express.Router();

// 🧭 Rutas de usuarios
router.get("/", obtenerUsuarios);                    
router.get("/:email", obtenerUsuarioPorEmail);       
router.post("/", crearUsuario);                     
router.post("/login", loginUsuario);               // <- ruta de login
router.delete("/:email", eliminarUsuarioPorEmail);  

export default router;
