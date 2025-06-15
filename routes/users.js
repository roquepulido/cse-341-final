import { Router } from "express";
import usersController from "../controllers/userController.js";
import validation from "../helpers/validate.js";
import {
  authenticateJWT,
  authorizeRoles,
} from "../middleware/authenticateJWT.js";

const router = Router();

// Get all users
router.get(
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Get all users'
    #swagger.description = 'Returns a list of all users'
    #swagger.security = [{"BearerAuth": []}]
    #swagger.responses[200] = {
      description: 'List of users',
      schema: {
        type: 'array',
        items: { $ref: '#/definitions/User' }
      }
    }
    */
  "/",
  authenticateJWT,
  authorizeRoles("admin", "worker"),
  usersController.getAllUsers
);

// Get user by ID
router.get(
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Get user by ID'
    #swagger.description = 'Returns a user by ID'
    #swagger.security = [{"BearerAuth": []}]
    #swagger.responses[200] = {
      description: 'User found',
      schema: {
        $ref: '#/definitions/User'
      }
    }
    #swagger.responses[404] = {
      description: 'User not found'
    }
    #swagger.responses[500] = {
      description: 'Internal server error'
    }
    */
  "/:id",
  authenticateJWT,
  authorizeRoles("admin", "worker"),
  validation.idValidationRules(),
  validation.validate,
  usersController.getUserById
);

router.post(
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Create a new user'
    #swagger.description = 'Creates a new user'
    #swagger.security = [{"BearerAuth": []}]
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'User object to be created',
      required: true,
      schema: {
        $ref: '#/definitions/User'
      }
    }
    #swagger.responses[201] = {
      description: 'User created successfully',
      schema: {
        $ref: '#/definitions/User'
      }
    }
    #swagger.responses[400] = {
      description: 'Invalid request'
    }
    #swagger.responses[500] = {
      description: 'Internal server error'
    }
    #swagger.responses[422] = {
      description: 'Validation error'
    }
    */
  "/",
  authenticateJWT,
  authorizeRoles("admin", "worker"),
  validation.userValidationRules(),
  validation.validate,
  usersController.createUser
);
router.put(
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Update an existing user'
    #swagger.description = 'Updates an existing user'
    #swagger.security = [{"BearerAuth": []}]
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'User object to be updated',
      required: true,
      schema: {
        $ref: '#/definitions/User'
      }
    }
    #swagger.responses[200] = {
      description: 'User updated successfully',
      schema: {
        $ref: '#/definitions/User'
      }
    }
    #swagger.responses[400] = {
      description: 'Invalid request'
    }
    #swagger.responses[500] = {
      description: 'Internal server error'
    }
    #swagger.responses[422] = {
      description: 'Validation error'
    }
    */
  "/:id",
  authenticateJWT,
  authorizeRoles("admin", "worker"),
  validation.idValidationRules(),
  validation.userUpdateValidationRules(),
  validation.validate,
  usersController.updateUser
);
router.delete(
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Delete a user'
    #swagger.description = 'Deletes a user by ID'
    #swagger.security = [{"BearerAuth": []}]
    #swagger.responses[204] = {
      description: 'User deleted successfully'
    }
    #swagger.responses[400] = {
      description: 'Invalid request'
    }
    #swagger.responses[500] = {
      description: 'Internal server error'
    }
    #swagger.responses[422] = {
      description: 'Validation error'
    }
    */
  "/:id",
  authenticateJWT,
  authorizeRoles("admin", "worker"),
  validation.idValidationRules(),
  validation.validate,
  usersController.deleteUser
);

router.post(
  /*
    #swagger.ignore = true
    */
  "/force-create",
  validation.userValidationRules(),
  validation.validate,
  usersController.createUser
);
export default router;
