import jwt from "jsonwebtoken";

/**
 * Middleware de autenticación JWT
 * - Soporta token desde cookie o header Authorization
 * - Maneja errores específicos (expirado, inválido)
 * - Añade req.user con datos del token
 */
export const authMiddleware = (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) {
      console.log("🚫 authMiddleware: no token recibido");
      return res
        .status(401)
        .json({ message: "No autorizado - token faltante" });
    }

    console.log("🔐 authMiddleware: token recibido:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🔍 authMiddleware: token decodificado:", decoded);

    req.user = decoded;
    next();
  } catch (error) {
    console.error("❌ authMiddleware error:", error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expirado" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token inválido" });
    }
    return res
      .status(500)
      .json({
        message: "Error interno en authMiddleware",
        error: error.message,
      });
  }
};
