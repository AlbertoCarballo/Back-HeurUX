import mongoose from "mongoose";

const respuestaSchema = new mongoose.Schema({
    section1: [Number],
    section2: [Number],
    section3: [Number],
    section4: [Number],
    section5: [Number],
    section6: [Number],
    section7: [Number],
    section8: [Number],
    section9: [Number],
    section10: [Number],
    section11: [Number],
    section12: [Number],
    section13: [Number],
    section14: [Number],
    section15: [Number],
    results: [Number],
    average: { type: Number }
}, { _id: false });

const testerSchema = new mongoose.Schema({
    id: { type: String, required: true }, // correo del tester
    answers: [respuestaSchema]
}, { _id: false });

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    URL: { type: String, required: true },
    description: { type: String, required: true },
    complexity: { type: String, required: true },
    
    // Nuevo campo: referencia al creador del proyecto
    creator: { type: String, required: true },

    // Testers que participaron
    testers: [testerSchema]
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
