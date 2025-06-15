import { body, param, validationResult } from "express-validator";
import { HTTP_STATUS } from "../utils/const.js";

const validate = {
  // Validates the ID parameter for routes that require a MongoDB ID
  idValidationRules: () => {
    return [param("id").isMongoId().withMessage("Invalid ID")];
  },

  // Validates input data for creating and updating users
  userValidationRules: () => {
    return [
      body("oauthId").notEmpty().withMessage("Param 'oauthId' is required"),
      body("email")
        .isEmail()
        .withMessage("Param 'email' must be a valid email")
        .isLength({ min: 5, max: 100 })
        .withMessage("Email must be between 5 and 100 characters"),
      body("name")
        .notEmpty()
        .withMessage("Param 'name' is required")
        .isLength({ min: 2, max: 50 })
        .withMessage("Name must be between 2 and 50 characters"),
      body("profilePicture")
        .optional()
        .isURL()
        .withMessage("Param 'profilePicture' must be a valid URL"),
      body("type")
        .optional()
        .isIn(["user", "admin", "worker"])
        .withMessage("Param 'type' must be one of: user, admin, worker"),
    ];
  },

  // Validates input data for updating users
  userUpdateValidationRules: () => {
    return [
      body("oauthId")
        .optional()
        .notEmpty()
        .withMessage("Param 'oauthId' is required"),
      body("email")
        .optional()
        .isEmail()
        .withMessage("Param 'email' must be a valid email")
        .isLength({ min: 5, max: 100 })
        .withMessage("Email must be between 5 and 100 characters"),
      body("name")
        .optional()
        .notEmpty()
        .withMessage("Param 'name' is required")
        .isLength({ min: 2, max: 50 })
        .withMessage("Name must be between 2 and 50 characters"),
      body("profilePicture")
        .optional()
        .isURL()
        .withMessage("Param 'profilePicture' must be a valid URL"),
      body("type")
        .optional()
        .isIn(["user", "admin", "worker"])
        .withMessage("Param 'type' must be one of: user, admin, worker"),
    ];
  },

  // Validates input data for creating and updating products
  productValidationRules: () => {
    return [
      body("name").notEmpty().withMessage("Param 'name' is required"),
      body("brand").notEmpty().withMessage("Param 'brand' is required"),
      body("price").isNumeric().withMessage("Param 'price' must be a number"),
      body("type")
        .isIn(["eyeglasses", "sunglasses", "contact_lenses"])
        .withMessage(
          "Param 'type' must be one of: eyeglasses, sunglasses, contact_lenses"
        ),
      body("stock")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Param 'stock' must be a non-negative integer"),
      body("attributes")
        .optional()
        .isObject()
        .withMessage("Param 'attributes' must be an object"),
    ];
  },

  // Validates input data for updating products
  productUpdateValidationRules: () => {
    return [
      body("name")
        .optional()
        .notEmpty()
        .withMessage("Param 'name' is required"),
      body("brand")
        .optional()
        .notEmpty()
        .withMessage("Param 'brand' is required"),
      body("price")
        .optional()
        .isNumeric()
        .withMessage("Param 'price' must be a number"),
      body("type")
        .optional()
        .isIn(["eyeglasses", "sunglasses", "contact_lenses"])
        .withMessage(
          "Param 'type' must be one of: eyeglasses, sunglasses, contact_lenses"
        ),
      body("stock")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Param 'stock' must be a non-negative integer"),
      body("attributes")
        .optional()
        .isObject()
        .withMessage("Param 'attributes' must be an object"),
    ];
  },

  // Validates input data for creating prescriptions
  prescriptionValidationRules: () => {
    return [
      body("sphere")
        .notEmpty()
        .withMessage("Param 'sphere' is required")
        .isNumeric()
        .withMessage("Param 'sphere' must be a number"),
      body("cylinder")
        .notEmpty()
        .withMessage("Param 'cylinder' is required")
        .isNumeric()
        .withMessage("Param 'cylinder' must be a number"),
      body("axis")
        .notEmpty()
        .withMessage("Param 'axis' is required")
        .isInt({ min: 0, max: 180 })
        .withMessage("Param 'axis' must be an integer between 0 and 180"),
      body("addition")
        .optional()
        .isNumeric()
        .withMessage("Param 'addition' must be a number"),
      body("prism")
        .optional()
        .isNumeric()
        .withMessage("Param 'prism' must be a number"),
      body("base")
        .optional()
        .isIn(["up", "down", "in", "out"])
        .withMessage("Param 'base' must be one of: up, down, in, out"),
      body("notes")
        .optional()
        .isString()
        .isLength({ max: 500 })
        .withMessage("Param 'notes' must be a string up to 500 characters"),
      body("dateIssued")
        .notEmpty()
        .withMessage("Param 'dateIssued' is required")
        .isISO8601()
        .withMessage("Param 'dateIssued' must be a valid date"),
      body("expirationDate")
        .notEmpty()
        .withMessage("Param 'expirationDate' is required")
        .isISO8601()
        .withMessage("Param 'expirationDate' must be a valid date"),
    ];
  },

  // Validates input data for updating prescriptions
  prescriptionUpdateValidationRules: () => {
    return [
      body("sphere")
        .optional()
        .isNumeric()
        .withMessage("Param 'sphere' must be a number"),
      body("cylinder")
        .optional()
        .isNumeric()
        .withMessage("Param 'cylinder' must be a number"),
      body("axis")
        .optional()
        .isInt({ min: 0, max: 180 })
        .withMessage("Param 'axis' must be an integer between 0 and 180"),
      body("addition")
        .optional()
        .isNumeric()
        .withMessage("Param 'addition' must be a number"),
      body("prism")
        .optional()
        .isNumeric()
        .withMessage("Param 'prism' must be a number"),
      body("base")
        .optional()
        .isIn(["up", "down", "in", "out"])
        .withMessage("Param 'base' must be one of: up, down, in, out"),
      body("notes")
        .optional()
        .isString()
        .isLength({ max: 500 })
        .withMessage("Param 'notes' must be a string up to 500 characters"),
      body("dateIssued")
        .optional()
        .isISO8601()
        .withMessage("Param 'dateIssued' must be a valid date"),
      body("expirationDate")
        .optional()
        .isISO8601()
        .withMessage("Param 'expirationDate' must be a valid date"),
    ];
  },

  // Validates input data for creating orders
  orderValidationRules: () => {
    return [
      body("prescription")
        .notEmpty()
        .withMessage("Param 'prescription' is required")
        .isMongoId()
        .withMessage("Param 'prescription' must be a valid ID"),
      body("product")
        .notEmpty()
        .withMessage("Param 'product' is required")
        .isMongoId()
        .withMessage("Param 'product' must be a valid ID"),
      body("quantity")
        .notEmpty()
        .withMessage("Param 'quantity' is required")
        .isInt({ min: 1 })
        .withMessage("Param 'quantity' must be an integer greater than 0"),
      body("total")
        .notEmpty()
        .withMessage("Param 'total' is required")
        .isNumeric()
        .withMessage("Param 'total' must be a number"),
      body("status")
        .optional()
        .isIn(["pending", "paid", "shipped", "delivered", "cancelled"])
        .withMessage(
          "Param 'status' must be one of: pending, paid, shipped, delivered, cancelled"
        ),
      body("orderDate")
        .optional()
        .isISO8601()
        .withMessage("Param 'orderDate' must be a valid date"),
    ];
  },

  // Validates input data for updating orders
  orderUpdateValidationRules: () => {
    return [
      body("prescription")
        .optional()
        .isMongoId()
        .withMessage("Param 'prescription' must be a valid ID"),
      body("product")
        .optional()
        .isMongoId()
        .withMessage("Param 'product' must be a valid ID"),
      body("quantity")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Param 'quantity' must be an integer greater than 0"),
      body("total")
        .optional()
        .isNumeric()
        .withMessage("Param 'total' must be a number"),
      body("status")
        .optional()
        .isIn(["pending", "paid", "shipped", "delivered", "cancelled"])
        .withMessage(
          "Param 'status' must be one of: pending, paid, shipped, delivered, cancelled"
        ),
      body("orderDate")
        .optional()
        .isISO8601()
        .withMessage("Param 'orderDate' must be a valid date"),
    ];
  },

  // Middleware to validate request data and return errors if any
  validate: (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = [];
    errors.array().forEach((err) => extractedErrors.push(err.msg));
    return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
      errors: extractedErrors,
    });
  },
};

export default validate;
