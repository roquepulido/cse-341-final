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
      type: "user",
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
        power: "-1.25", // para contact_lenses
        baseCurve: "8.6", // para contact_lenses
        diameter: "14.2", // para contact_lenses
        material: "hydrogel", // para contact_lenses
      },
    },
    Prescription: {
      user: "60d21b4667d0d8992e610c84",
      sphere: -1.25,
      cylinder: -0.5,
      axis: 90,
      addition: 2.0,
      prism: 0.5,
      base: "up",
      notes: "Patient requires progressive lenses.",
      dateIssued: "2024-05-01",
      expirationDate: "2025-05-01",
    },
    Order: {
      user: "60d21b4667d0d8992e610c84",
      prescription: "60d21b4667d0d8992e610c85",
      product: "60d21b4967d0d8992e610c86",
      quantity: 2,
      total: 241.0,
      status: "pending",
      orderDate: "2024-06-01",
    },
  },
  securityDefinitions: {
    BearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "Ingrese el token JWT con el formato: Bearer {token}",
    },
  },
};
const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];
swaggerAutogen(outputFile, endpointsFiles, doc);
