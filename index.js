import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Rutas
import userRoutes from "./routes/userRoute.js";
import projectRoutes from "./routes/projectRoutes.js";
import emailRoutes from "./routes/emailRoutes.js"; // 👈 nueva importación

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Conectado a MongoDB"))
    .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));

// Rutas principales
app.use("/api/usuarios", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/email", emailRoutes); // 👈 nueva ruta para correos

// Ruta base
app.get("/", (req, res) => {
    res.send("🚀 API funcionando correctamente");
});

// Servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
