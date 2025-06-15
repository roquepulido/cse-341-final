import { Router } from "express";
import prescriptionController from "../controllers/prescriptionController.js";
import {
  authenticateJWT,
  authorizeRoles,
} from "../middleware/authenticateJWT.js";
import validation from "../helpers/validate.js";

const router = Router();

// Get all prescriptions
router.get(
  /*
    #swagger.tags = ['Prescriptions']
    #swagger.summary = 'Get all prescriptions'
    #swagger.description = 'Returns a list of all prescriptions for the authenticated user'
    #swagger.security = [{"BearerAuth": []}]
    #swagger.responses[200] = {
      description: 'List of prescriptions',
      schema: {
        type: 'array',
        items: { $ref: '#/definitions/Prescription' }
      }
    }
  */
  "/",
  authenticateJWT,
  authorizeRoles("admin", "worker"),
  prescriptionController.getAll
);

// Get prescription by ID
router.get(
  /*
    #swagger.tags = ['Prescriptions']
    #swagger.summary = 'Get prescription by ID'
    #swagger.description = 'Returns a prescription by ID for the authenticated user'
    #swagger.security = [{"BearerAuth": []}]
    #swagger.responses[200] = {
      description: 'Prescription found',
      schema: { $ref: '#/definitions/Prescription' }
    },
    #swagger.responses[404] = {
      description: 'Prescription not found'
    }
  */
  "/:id",
  authenticateJWT,
  authorizeRoles("admin", "worker"),
  validation.idValidationRules(),
  validation.validate,
  prescriptionController.getById
);

// Create prescription
router.post(
  /*
    #swagger.tags = ['Prescriptions']
    #swagger.summary = 'Create a new prescription'
    #swagger.description = 'Creates a new prescription for the authenticated user'
    #swagger.security = [{"BearerAuth": []}]
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Prescription data',
      required: true,
      schema: { $ref: '#/definitions/Prescription' }
    }
    #swagger.responses[201] = {
      description: 'Prescription created',
      schema: { $ref: '#/definitions/Prescription' }
    },
    #swagger.responses[400] = {
      description: 'Invalid input'
    }
  */
  "/",
  authenticateJWT,
  authorizeRoles("admin", "worker"),
  validation.prescriptionValidationRules(),
  validation.validate,
  prescriptionController.create
);

// Update prescription
router.put(
  /*
    #swagger.tags = ['Prescriptions']
    #swagger.summary = 'Update a prescription'
    #swagger.description = 'Updates an existing prescription by ID for the authenticated user'
    #swagger.security = [{"BearerAuth": []}]
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Prescription data to update',
      required: true,
      schema: { $ref: '#/definitions/Prescription' }
    }
    #swagger.responses[200] = {
      description: 'Prescription updated',
      schema: { $ref: '#/definitions/Prescription' }
    },
    #swagger.responses[400] = {
      description: 'Invalid input'
    },
    #swagger.responses[404] = {
      description: 'Prescription not found'
    }
  */
  "/:id",
  authenticateJWT,
  authorizeRoles("admin", "worker"),
  validation.idValidationRules(),
  validation.prescriptionValidationRules(),
  validation.validate,
  prescriptionController.update
);

// Delete prescription
router.delete(
  /*
    #swagger.tags = ['Prescriptions']
    #swagger.summary = 'Delete a prescription'
    #swagger.description = 'Deletes a prescription by ID for the authenticated user'
    #swagger.security = [{"BearerAuth": []}]
    #swagger.responses[200] = {
      description: 'Prescription deleted'
    },
    #swagger.responses[404] = {
      description: 'Prescription not found'
    }
  */
  "/:id",
  authenticateJWT,
  authorizeRoles("admin", "worker"),
  validation.idValidationRules(),
  validation.validate,
  prescriptionController.delete
);

export default router;
