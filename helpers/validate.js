import { body, param, validationResult } from "express-validator";
import { HTTP_STATUS } from "../utils/const.js";

// Validate ID parameter for routes that require an ID
export const idValidationRules = () => {
  return [param("id").isMongoId().withMessage("Invalid ID")];
};

// Validate user input for creating and updating users
export const userValidationRules = () => {
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
};

// Validate user input for updating users
export const userUpdateValidationRules = () => {
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
};

// Validate product input for creating and updating products
export const productValidationRules = () => {
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
    // Puedes agregar validaciones específicas para los atributos según el tipo si lo deseas
  ];
};

// Validate product input for updating products
export const productUpdateValidationRules = () => {
  return [
    body("name").optional().notEmpty().withMessage("Param 'name' is required"),
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
};

// Middleware to validate request data
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().forEach((err) => extractedErrors.push(err.msg));

  return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
    errors: extractedErrors,
  });
};
