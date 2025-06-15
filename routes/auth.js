import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { HTTP_STATUS } from "../utils/const.js";
import User from "../models/user.js";
dotenv.config();

const router = express.Router();

// Authentication routes
router.get(
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'GitHub OAuth login'
    #swagger.description = 'Redirige al usuario a GitHub para autenticación OAuth.'
  */
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'GitHub OAuth callback'
    #swagger.description = 'Callback de GitHub OAuth. Devuelve un JWT si la autenticación es exitosa.'
    #swagger.responses[200] = {
      description: 'JWT generado correctamente',
      schema: { token: 'jwt-token' }
    }
    #swagger.responses[401] = {
      description: 'Autenticación fallida'
    }
  */
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth/failure" }),
  async (req, res) => {
    // Generate JWT token after successful authentication
    console.log("User authenticated successfully:", req.user);
    
    const user = req.user;
    // find role of user by username
    const userInfo = await User.findOne({ oauthId: user.id });
    console.log("User info:", userInfo);
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: userInfo.type || "user",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  }
);

router.get(
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Fallo de autenticación'
    #swagger.description = 'Devuelve un mensaje de error si la autenticación falla.'
    #swagger.responses[401] = {
      description: 'Fallo de autenticación',
      schema: { message: 'Authentication failed' }
    }
  */
  "/failure",
  (req, res) => {
    res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: "Authentication failed" });
  }
);

export default router;
