import Section from "../models/Section.js";
import SECTIONS from "../data/sections.js"; // 👈 sin llaves si usas "export default"

export const seedSections = async (req, res) => {
    try {
        await Section.deleteMany(); // limpiar antes de insertar
        const sectionsWithIds = SECTIONS.map((section, index) => ({
            idSection: index + 1,
            ...section
        }));

        await Section.insertMany(sectionsWithIds);

        res.status(200).json({
            success: true,
            message: "Secciones insertadas correctamente ✅",
            count: sectionsWithIds.length
        });
    } catch (error) {
        console.error("Error al insertar secciones:", error);
        res.status(500).json({
            success: false,
            message: "Error al insertar secciones",
            error
        });
    }
};

export const getSections = async (req, res) => {
    try {
        const sections = await Section.find();
        res.json(sections);
    } catch (error) {
        console.error("Error al obtener secciones:", error);
        res.status(500).json({ message: "Error al obtener secciones" });
    }
};
