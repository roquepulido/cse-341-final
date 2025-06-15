import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
import { HTTP_STATUS } from "../utils/const.js";

function getTokenFromHeader(req) {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }
  return null;
}

// Middleware para autenticar JWT
export function authenticateJWT(req, res, next) {
  const token = getTokenFromHeader(req);
  console.debug(token);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log(`[${req.method}] ${req.originalUrl} -> Forbidden`);
        console.log("JWT verification failed:", err.cause || err.message);
        return res.sendStatus(HTTP_STATUS.FORBIDDEN);
      }
      req.user = user;
      next();
    });
  } else {
    console.log(`[${req.method}] ${req.originalUrl} -> Unauthorized`);
    res.sendStatus(HTTP_STATUS.UNAUTHORIZED);
  }
}

export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const token = getTokenFromHeader(req);
    if (!token) {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: "No token provided" });
    }
    try {
      // Decodificar el token y extraer el claim 'role'
      const decoded = jwt.decode(token);
      const userRole = decoded?.role;
      if (!userRole || !allowedRoles.includes(userRole)) {
        return res
          .status(HTTP_STATUS.FORBIDDEN)
          .json({ message: "Forbidden: insufficient role" });
      }
      // Opcional: adjuntar el rol al request para uso posterior
      req.user = { ...req.user, role: userRole };
      next();
    } catch (err) {
      console.error("Error decoding token:", err);
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: "Invalid token" });
    }
  };
}
