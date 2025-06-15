import express from "express";
import swaggerRouter from "./swagger.js";
import { version } from "../server.js";
import userRouter from "./users.js";
import productRouter from "./products.js";

const router = express.Router();

router.get("/", (req, res) => {
  //#swagger.tags = ['Version']
  //#swagger.summary = 'Get API version'
  //#swagger.description = 'Returns the current version of the API'
  res.send(`This is version ${version}`);
});
router.use("/swagger", swaggerRouter);
router.use("/users", userRouter);
router.use("/products", productRouter);

export default router;
