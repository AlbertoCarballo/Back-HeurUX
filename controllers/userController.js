import User from "../models/Users.js";

// Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await User.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener usuarios", error });
    }
};

// Crear un nuevo usuario
export const crearUsuario = async (req, res) => {
    try {
        const nuevoUsuario = new User(req.body);
        await nuevoUsuario.save();
        res.json({ mensaje: "Usuario creado correctamente", usuario: nuevoUsuario });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear usuario", error });
    }
};

// Eliminar un usuario por ID
export const eliminarUsuario = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar usuario", error });
    }
};
