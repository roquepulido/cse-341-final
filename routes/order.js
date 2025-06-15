import { Router } from "express";
import orderController from "../controllers/orderController.js";
import {
  authenticateJWT,
  authorizeRoles,
} from "../middleware/authenticateJWT.js";
import validation from "../helpers/validate.js";

const router = Router();

// Get all orders
router.get(
  /*
    #swagger.tags = ['Orders']
    #swagger.summary = 'Get all orders'
    #swagger.description = 'Returns a list of all orders for the authenticated user'
    #swagger.security = [{"BearerAuth": []}]
    #swagger.responses[200] = {
      description: 'List of orders',
      schema: {
        type: 'array',
        items: { $ref: '#/definitions/Order' }
      }
    }
  */
  "/",
  authenticateJWT,
  authorizeRoles("admin", "worker"),
  orderController.getAll
);

// Get order by ID
router.get(
  /*
    #swagger.tags = ['Orders']
    #swagger.summary = 'Get order by ID'
    #swagger.description = 'Returns an order by ID for the authenticated user'
    #swagger.security = [{"BearerAuth": []}]
    #swagger.responses[200] = {
      description: 'Order found',
      schema: { $ref: '#/definitions/Order' }
    },
    #swagger.responses[404] = {
      description: 'Order not found'
    }
  */
  "/:id",
  authenticateJWT,
  authorizeRoles("admin", "worker"),
  validation.idValidationRules(),
  validation.validate,
  orderController.getById
);

// Create order
router.post(
  /*
    #swagger.tags = ['Orders']
    #swagger.summary = 'Create a new order'
    #swagger.description = 'Creates a new order for the authenticated user'
    #swagger.security = [{"BearerAuth": []}]
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Order data',
      required: true,
      schema: { $ref: '#/definitions/Order' }
    }
    #swagger.responses[201] = {
      description: 'Order created',
      schema: { $ref: '#/definitions/Order' }
    },
    #swagger.responses[400] = {
      description: 'Invalid input'
    }
  */
  "/",
  authenticateJWT,
  authorizeRoles("admin", "worker"),
  validation.orderValidationRules(),
  validation.validate,
  orderController.create
);

// Update order
router.put(
  /*
    #swagger.tags = ['Orders']
    #swagger.summary = 'Update an order'
    #swagger.description = 'Updates an existing order by ID for the authenticated user'
    #swagger.security = [{"BearerAuth": []}]
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Order data to update',
      required: true,
      schema: { $ref: '#/definitions/Order' }
    }
    #swagger.responses[200] = {
      description: 'Order updated',
      schema: { $ref: '#/definitions/Order' }
    },
    #swagger.responses[400] = {
      description: 'Invalid input'
    },
    #swagger.responses[404] = {
      description: 'Order not found'
    }
  */
  "/:id",
  authenticateJWT,
  authorizeRoles("admin", "worker"),
  validation.idValidationRules(),
  validation.orderValidationRules(),
  validation.validate,
  orderController.update
);

// Delete order
router.delete(
  /*
    #swagger.tags = ['Orders']
    #swagger.summary = 'Delete an order'
    #swagger.description = 'Deletes an order by ID for the authenticated user'
    #swagger.security = [{"BearerAuth": []}]
    #swagger.responses[200] = {
      description: 'Order deleted'
    },
    #swagger.responses[404] = {
      description: 'Order not found'
    }
  */
  "/:id",
  authenticateJWT,
  authorizeRoles("admin", "worker"),
  validation.idValidationRules(),
  validation.validate,
  orderController.delete
);

export default router;
