import mongoose from "mongoose";

const respuestaSchema = new mongoose.Schema({
    seccion1: [Number],
    seccion2: [Number],
    resultados: [Number] // ← nuevo arreglo para almacenar resultados finales
}, { _id: false });

const testerSchema = new mongoose.Schema({
    id: { type: String, required: true }, // correo del tester
    respuestas: [respuestaSchema]
}, { _id: false });

const projectSchema = new mongoose.Schema({
    id: { type: String, required: true },
    nombre: { type: String, required: true },
    tester: [testerSchema]
}, { _id: false });

const userSchema = new mongoose.Schema({
    id: { type: String, required: true }, // correo del usuario
    nombre: { type: String, required: true },
    testing: [String], // IDs de proyectos que el usuario está probando
    friends: [String], // correos de amigos
    projects: [projectSchema] // lista de proyectos
}, { timestamps: true });

export default mongoose.model("User", userSchema);
