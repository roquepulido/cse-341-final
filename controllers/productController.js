import Product from "../models/product.js";
import { HTTP_STATUS } from "../utils/const.js";

const productController = {
  async getAllProducts(req, res) {
    console.debug("[GET] /products - productController.getAllProducts", {
      method: req.method,
      url: req.originalUrl,
      query: req.query,
      params: req.params,
      body: req.body,
    });
    try {
      const products = await Product.find();
      res.status(HTTP_STATUS.OK).json(products);
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  },

  async getProductById(req, res) {
    console.debug("[GET] /products/:id - productController.getProductById", {
      method: req.method,
      url: req.originalUrl,
      query: req.query,
      params: req.params,
      body: req.body,
    });
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Product not found" });
      }
      res.status(HTTP_STATUS.OK).json(product);
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  },

  async createProduct(req, res) {
    console.debug("[POST] /products - productController.createProduct", {
      method: req.method,
      url: req.originalUrl,
      query: req.query,
      params: req.params,
      body: req.body,
    });
    try {
      const newProduct = new Product(req.body);
      await newProduct.save();
      res.status(HTTP_STATUS.CREATED).json(newProduct);
    } catch (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
    }
  },

  async updateProduct(req, res) {
    console.debug("[PUT] /products/:id - productController.updateProduct", {
      method: req.method,
      url: req.originalUrl,
      query: req.query,
      params: req.params,
      body: req.body,
    });
    try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedProduct) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Product not found" });
      }
      res.status(HTTP_STATUS.OK).json(updatedProduct);
    } catch (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
    }
  },

  async deleteProduct(req, res) {
    console.debug("[DELETE] /products/:id - productController.deleteProduct", {
      method: req.method,
      url: req.originalUrl,
      query: req.query,
      params: req.params,
      body: req.body,
    });
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Product not found" });
      }
      res.status(HTTP_STATUS.OK).send({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  },
};

export default productController;
