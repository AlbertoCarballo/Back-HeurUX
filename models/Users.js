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
    id: { type: String, required: true },
    answers: [respuestaSchema]
}, { _id: false });

const projectSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    URL: {type: String, required: true},
    description: {type: String, required: true},
    complexity: {type: String, requided: true},
    tester: [testerSchema]
}, { _id: false });

const userSchema = new mongoose.Schema({
    id: { type: String, required: true }, // correo
    password: { type: String, required: true },
    name: { type: String, required: true },
    dob: { type: Date },
    experiences: { type: [String], default: [] },
    languages: { type: [String], default: [] },
    phone: { type: [String], default: [] },
    grades: { type: [String], default: [] },
    testing: { type: [String], default: [] },
    friends: { type: [String], default: [] },
    projects: { type: [projectSchema], default: [] }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
