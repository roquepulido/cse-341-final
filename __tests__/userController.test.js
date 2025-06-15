import userController from "../controllers/userController.js";
import User from "../models/User.js";
import { HTTP_STATUS } from "../utils/const.js";
import { jest } from "@jest/globals";

jest.mock("../models/User.js");

describe("userController", () => {
  let req, res;

  beforeEach(() => {
    req = { method: "GET", originalUrl: "", query: {}, params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  describe("getAllUsers", () => {
    it("should return all users", async () => {
      const users = [{ name: "User1" }, { name: "User2" }];
      User.find.mockResolvedValue(users);

      await userController.getAllUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(res.json).toHaveBeenCalledWith(users);
    });

    it("should handle errors", async () => {
      User.find.mockRejectedValue(new Error("DB Error"));

      await userController.getAllUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({ message: "DB Error" });
    });
  });

  describe("getUserById", () => {
    it("should return a user by id", async () => {
      req.params.id = "123";
      const user = { name: "User1" };
      User.findById.mockResolvedValue(user);

      await userController.getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(res.json).toHaveBeenCalledWith(user);
    });

    it("should return 404 if user not found", async () => {
      req.params.id = "123";
      User.findById.mockResolvedValue(null);

      await userController.getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should handle errors", async () => {
      req.params.id = "123";
      User.findById.mockRejectedValue(new Error("DB Error"));

      await userController.getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({ message: "DB Error" });
    });
  });
});
