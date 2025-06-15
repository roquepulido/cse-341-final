import productController from "../controllers/productController.js";
import Product from "../models/product.js";
import { HTTP_STATUS } from "../utils/const.js";
import { jest } from "@jest/globals";

jest.mock("../models/product.js");

describe("productController", () => {
  let req, res;

  beforeEach(() => {
    req = { method: "GET", originalUrl: "", query: {}, params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  describe("getAllProducts", () => {
    it("should return all products", async () => {
      const products = [{ name: "Prod1" }, { name: "Prod2" }];
      Product.find.mockResolvedValue(products);

      await productController.getAllProducts(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(res.json).toHaveBeenCalledWith(products);
    });

    it("should handle errors", async () => {
      Product.find.mockRejectedValue(new Error("DB Error"));

      await productController.getAllProducts(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({ message: "DB Error" });
    });
  });

  describe("getProductById", () => {
    it("should return a product by id", async () => {
      req.params.id = "123";
      const product = { name: "Prod1" };
      Product.findById.mockResolvedValue(product);

      await productController.getProductById(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(res.json).toHaveBeenCalledWith(product);
    });

    it("should return 404 if product not found", async () => {
      req.params.id = "123";
      Product.findById.mockResolvedValue(null);

      await productController.getProductById(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND);
      expect(res.json).toHaveBeenCalledWith({ message: "Product not found" });
    });

    it("should handle errors", async () => {
      req.params.id = "123";
      Product.findById.mockRejectedValue(new Error("DB Error"));

      await productController.getProductById(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({ message: "DB Error" });
    });
  });
});
