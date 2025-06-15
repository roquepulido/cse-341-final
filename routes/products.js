import { Router } from "express";
import productController from "../controllers/productController.js";
import validation from "../helpers/validate.js";
import {
  authenticateJWT,
  authorizeRoles,
} from "../middleware/authenticateJWT.js";

const router = Router();

// Get all products
router.get(
  /*
    #swagger.tags = ['Products']
    #swagger.summary = 'Get all products'
    #swagger.description = 'Returns a list of all products'
    #swagger.responses[200] = {
      description: 'List of products',
      schema: {
        type: 'array',
        items: { $ref: '#/definitions/Product' }
      }
    }
  */
  "/",
  productController.getAllProducts
);

// Get product by ID
router.get(
  /*
    #swagger.tags = ['Products']
    #swagger.summary = 'Get product by ID'
    #swagger.description = 'Returns a product by ID'
    #swagger.responses[200] = {
      description: 'Product found',
      schema: { $ref: '#/definitions/Product' }
    },
    #swagger.responses[404] = {
      description: 'Product not found'
    }
  */
  "/:id",
  validation.idValidationRules(),
  validation.validate,
  productController.getProductById
);

// Create product
router.post(
  /*
    #swagger.tags = ['Products']
    #swagger.summary = 'Create a new product'
    #swagger.description = 'Creates a new product with the provided data'
    #swagger.security = [{"BearerAuth": []}]
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Product data',
      required: true,
      schema: { $ref: '#/definitions/Product' }
    }
    #swagger.responses[201] = {
      description: 'Product created',
      schema: { $ref: '#/definitions/Product' }
    },
    #swagger.responses[400] = {
      description: 'Invalid input'
    }
  */
  "/",
  authenticateJWT,
  authorizeRoles("admin", "worker"),
  validation.productValidationRules(),
  validation.validate,
  productController.createProduct
);

// Update product
router.put(
  /*
    #swagger.tags = ['Products']
    #swagger.summary = 'Update a product'
    #swagger.description = 'Updates an existing product by ID'
    #swagger.security = [{"BearerAuth": []}]
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Product data to update',
      required: true,
      schema: { $ref: '#/definitions/Product' }
    }
    #swagger.responses[200] = {
      description: 'Product updated',
      schema: { $ref: '#/definitions/Product' }
    },
    #swagger.responses[400] = {
      description: 'Invalid input'
    },
    #swagger.responses[404] = {
      description: 'Product not found'
    }
  */
  "/:id",
  authenticateJWT,
  authorizeRoles("admin", "worker"),
  validation.idValidationRules(),
  validation.productUpdateValidationRules(),
  validation.validate,
  productController.updateProduct
);

// Delete product
router.delete(
  /*
    #swagger.tags = ['Products']
    #swagger.summary = 'Delete a product'
    #swagger.description = 'Deletes a product by ID'
    #swagger.security = [{"BearerAuth": []}]
    #swagger.responses[204] = {
      description: 'Product deleted'
    },
    #swagger.responses[404] = {
      description: 'Product not found'
    }
  */
  "/:id",
  authenticateJWT,
  authorizeRoles("admin", "worker"),
  validation.idValidationRules(),
  validation.validate,
  productController.deleteProduct
);

export default router;
