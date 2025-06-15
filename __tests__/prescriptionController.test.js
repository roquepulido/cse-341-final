import prescriptionController from "../controllers/prescriptionController.js";
import Prescription from "../models/prescription.js";
import { HTTP_STATUS } from "../utils/const.js";
import { jest } from "@jest/globals";

jest.mock("../models/prescription.js");

describe("prescriptionController", () => {
  let req, res;

  beforeEach(() => {
    req = { user: { id: "user1" }, method: "GET", originalUrl: "", query: {}, params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("should return all prescriptions for user", async () => {
      const prescriptions = [{ _id: "1" }, { _id: "2" }];
      Prescription.find.mockResolvedValue(prescriptions);

      await prescriptionController.getAll(req, res);

      expect(Prescription.find).toHaveBeenCalledWith({ user: "user1" });
      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(res.json).toHaveBeenCalledWith(prescriptions);
    });

    it("should handle errors", async () => {
      Prescription.find.mockRejectedValue(new Error("DB Error"));

      await prescriptionController.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({ message: "DB Error" });
    });
  });

  describe("getById", () => {
    it("should return a prescription by id for user", async () => {
      req.params.id = "123";
      const prescription = { _id: "123" };
      Prescription.findOne.mockResolvedValue(prescription);

      await prescriptionController.getById(req, res);

      expect(Prescription.findOne).toHaveBeenCalledWith({ _id: "123", user: "user1" });
      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(res.json).toHaveBeenCalledWith(prescription);
    });

    it("should return 404 if prescription not found", async () => {
      req.params.id = "123";
      Prescription.findOne.mockResolvedValue(null);

      await prescriptionController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND);
      expect(res.json).toHaveBeenCalledWith({ message: "Prescription not found" });
    });

    it("should handle errors", async () => {
      req.params.id = "123";
      Prescription.findOne.mockRejectedValue(new Error("DB Error"));

      await prescriptionController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({ message: "DB Error" });
    });
  });
});
