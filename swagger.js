import swaggerAutogen from "swagger-autogen";
import { version } from "./server.js";
const doc = {
  info: {
    title: "Final Project CSE-341 Optica-AL API",
    version: version,
    description: "API documentation",
  },
  host: "localhost:3000",
  schemes: ["http"],
  definitions: {
    User: {
      oauthId: "oauth-provider-id",
      email: "user@email.com",
      name: "John Doe",
      profilePicture: "https://example.com/profile.jpg",
      type: "user"
    },
    Product: {
      name: "Ray-Ban Wayfarer",
      brand: "Ray-Ban",
      price: 120.5,
      type: "eyeglasses",
      description: "Classic eyeglasses frame.",
      stock: 10,
      attributes: {
        frameMaterial: "acetate",
        frameColor: "black",
        lensMaterial: "plastic",
        lensColor: "clear",
        gender: "unisex",
        shape: "rectangle",
        lensType: "monthly", // para contact_lenses
        power: "-1.25",      // para contact_lenses
        baseCurve: "8.6",    // para contact_lenses
        diameter: "14.2",    // para contact_lenses
        material: "hydrogel" // para contact_lenses
      },
    },
  },
};
const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];
swaggerAutogen(outputFile, endpointsFiles, doc);
