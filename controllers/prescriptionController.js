import Prescription from '../models/prescription.js';
import { HTTP_STATUS } from "../utils/const.js";

const prescriptionController = {
  // [GET] /prescriptions
  async getAll(req, res) {
    console.debug("[GET] /prescriptions - prescriptionController.getAll", {
      method: req.method,
      url: req.originalUrl,
      query: req.query,
      params: req.params,
      body: req.body,
    });
    try {
      const prescriptions = await Prescription.find({ user: req.user.id });
      res.status(HTTP_STATUS.OK).json(prescriptions);
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  },

  // [GET] /prescriptions/:id
  async getById(req, res) {
    console.debug("[GET] /prescriptions/:id - prescriptionController.getById", {
      method: req.method,
      url: req.originalUrl,
      query: req.query,
      params: req.params,
      body: req.body,
    });
    try {
      const prescription = await Prescription.findOne({ _id: req.params.id, user: req.user.id });
      if (!prescription) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Prescription not found" });
      }
      res.status(HTTP_STATUS.OK).json(prescription);
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  },

  // [POST] /prescriptions
  async create(req, res) {
    console.debug("[POST] /prescriptions - prescriptionController.create", {
      method: req.method,
      url: req.originalUrl,
      query: req.query,
      params: req.params,
      body: req.body,
    });
    try {
      const data = { ...req.body, user: req.user.id };
      const prescription = new Prescription(data);
      await prescription.save();
      res.status(HTTP_STATUS.CREATED).json(prescription);
    } catch (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
    }
  },

  // [PUT] /prescriptions/:id
  async update(req, res) {
    console.debug("[PUT] /prescriptions/:id - prescriptionController.update", {
      method: req.method,
      url: req.originalUrl,
      query: req.query,
      params: req.params,
      body: req.body,
    });
    try {
      const prescription = await Prescription.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        req.body,
        { new: true, runValidators: true }
      );
      if (!prescription) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Prescription not found" });
      }
      res.status(HTTP_STATUS.OK).json(prescription);
    } catch (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
    }
  },

  // [DELETE] /prescriptions/:id
  async delete(req, res) {
    console.debug("[DELETE] /prescriptions/:id - prescriptionController.delete", {
      method: req.method,
      url: req.originalUrl,
      query: req.query,
      params: req.params,
      body: req.body,
    });
    try {
      const prescription = await Prescription.findOneAndDelete({ _id: req.params.id, user: req.user.id });
      if (!prescription) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Prescription not found" });
      }
      res.status(HTTP_STATUS.OK).json({ message: "Prescription deleted successfully" });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  },
};

export default prescriptionController;