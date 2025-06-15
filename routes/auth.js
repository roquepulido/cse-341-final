import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { HTTP_STATUS } from "../utils/const.js";
import User from "../models/User.js";
dotenv.config();

const router = express.Router();

// Authentication routes
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth/failure" }),
  (req, res) => {
    // Generate JWT token after successful authentication
    const user = req.user;
    // find role of user by username
    const userInfo = User.findOne({ oauthId: user.id });
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

router.get("/failure", (req, res) => {
  res
    .status(HTTP_STATUS.UNAUTHORIZED)
    .json({ message: "Authentication failed" });
});

export default router;
