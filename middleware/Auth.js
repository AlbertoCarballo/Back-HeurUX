import jwt from "jsonwebtoken";

/**
 * Middleware de autenticación JWT
 * - Soporta token desde cookie o header Authorization
 * - Maneja errores específicos (expirado, inválido)
 * - Añade req.user con datos del token
 */
export const authMiddleware = (req, res, next) => {
  try {
    // 🔍 Buscar el token en cookies o encabezados
    const token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) {
      return res
        .status(401)
        .json({ message: "🚫 No autorizado, token faltante" });
    }

    // ✅ Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Guardar datos decodificados para siguientes middlewares/controladores
    req.user = decoded;

    // Opcional: log útil en desarrollo
    if (process.env.NODE_ENV !== "production") {
      console.log("🟢 Token verificado para:", decoded.id);
    }

    next();
  } catch (error) {
    // Manejo de errores comunes de JWT
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "⏰ Token expirado, vuelve a iniciar sesión" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "❌ Token inválido" });
    } else {
      return res
        .status(500)
        .json({
          message: "⚠️ Error interno en autenticación",
          error: error.message,
        });
    }
  }
};
