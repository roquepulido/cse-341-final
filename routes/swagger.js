import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";

const swaggerPath = path.resolve("swagger.json");
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, "utf-8"));

const swaggerRouter = Router();

swaggerRouter.use("/api-docs", swaggerUi.serve);
swaggerRouter.get("/api-docs", (req, res) => {
  // #swagger.tags = ['Swagger-UI']
  // #swagger.summary = 'Swagger UI'
  swaggerUi.setup(swaggerDocument)(req, res);
});

export default swaggerRouter;
