import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    es: { type: String, required: true },
    en: { type: String, required: true }
});

const SectionSchema = new mongoose.Schema({
    idSection: { type: Number, required: true, unique: true },
    key: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    questions: [QuestionSchema]
});

export default mongoose.model("Section", SectionSchema);
