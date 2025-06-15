import orderController from "../controllers/orderController.js";
import Order from "../models/Order.js";
import { HTTP_STATUS } from "../utils/const.js";
import { jest } from "@jest/globals";

jest.mock("../models/order.js");

describe("orderController", () => {
  let req, res;

  beforeEach(() => {
    req = {
      user: { id: "user1" },
      method: "GET",
      originalUrl: "",
      query: {},
      params: {},
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("should return all orders for user", async () => {
      const orders = [{ _id: "1" }, { _id: "2" }];
      Order.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        populate: jest.fn().mockResolvedValue(orders),
      });

      // Mock the chained populate calls
      Order.find.mockReturnValueOnce({
        populate: jest.fn().mockReturnThis(),
        populate: jest.fn().mockResolvedValue(orders),
      });

      await orderController.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(res.json).toHaveBeenCalledWith(orders);
    });

    it("should handle errors", async () => {
      Order.find.mockImplementation(() => ({
        populate: jest.fn().mockReturnThis(),
        populate: jest.fn().mockRejectedValue(new Error("DB Error")),
      }));

      const next = jest.fn();
      await orderController.getAll(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("getById", () => {
    it("should return an order by id for user", async () => {
      req.params.id = "123";
      const order = { _id: "123" };
      Order.findOne.mockReturnValueOnce({
        populate: jest.fn().mockReturnThis(),
        populate: jest.fn().mockResolvedValue(order),
      });

      await orderController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(res.json).toHaveBeenCalledWith(order);
    });

    it("should return 404 if order not found", async () => {
      req.params.id = "123";
      Order.findOne.mockReturnValueOnce({
        populate: jest.fn().mockReturnThis(),
        populate: jest.fn().mockResolvedValue(null),
      });

      await orderController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND);
      expect(res.json).toHaveBeenCalledWith({ message: "Order not found" });
    });

    it("should handle errors", async () => {
      req.params.id = "123";
      Order.findOne.mockReturnValueOnce({
        populate: jest.fn().mockReturnThis(),
        populate: jest.fn().mockRejectedValue(new Error("DB Error")),
      });

      await orderController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(
        HTTP_STATUS.INTERNAL_SERVER_ERROR
      );
      expect(res.json).toHaveBeenCalledWith({ message: "DB Error" });
    });
  });
});
