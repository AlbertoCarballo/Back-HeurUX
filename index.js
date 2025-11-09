import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import sectionRoutes from "./routes/sectionRoutes.js";


// Rutas
import userRoutes from "./routes/userRoute.js";
import projectRoutes from "./routes/projectRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";

dotenv.config();

const app = express();

// ✅ CORS config correcto para cookies
app.use(
    cors({
        origin: "http://localhost:3000",  // URL del front
        credentials: true,                // Permitir envío de cookies
    })
);

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Conectado a MongoDB"))
    .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));

// ✅ Header extra para cookies y métodos
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

// Rutas
app.use("/api/usuarios", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/sections", sectionRoutes);


app.get("/", (req, res) => {
    res.send("🚀 API funcionando correctamente");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
