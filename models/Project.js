import mongoose from "mongoose";

const respuestaSchema = new mongoose.Schema({
    section1: [Number],
    description1: [String],
    section2: [Number],
    description2: [String],
    section3: [Number],
    description3: [String],
    section4: [Number],
    description4: [String],
    section5: [Number],
    description5: [String],
    section6: [Number],
    description6: [String],
    section7: [Number],
    description7: [String],
    section8: [Number],
    description8: [String],
    section9: [Number],
    description9: [String],
    section10: [Number],
    description10: [String],
    section11: [Number],
    description11: [String],
    section12: [Number],
    description12: [String],
    section13: [Number],
    description13: [String],
    section14: [Number],
    description14: [String],
    section15: [Number],
    description15: [String],
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
