import Order from "../models/Order.js";
import { HTTP_STATUS } from "../utils/const.js";

const orderController = {
  // [GET] /orders
  async getAll(req, res) {
    console.debug("[GET] /orders - orderController.getAll", {
      method: req.method,
      url: req.originalUrl,
      query: req.query,
      params: req.params,
      body: req.body,
    });
    try {
      const orders = await Order.find({ user: req.user.id }).populate('prescription').populate('product');
      res.status(HTTP_STATUS.OK).json(orders);
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  },

  // [GET] /orders/:id
  async getById(req, res) {
    console.debug("[GET] /orders/:id - orderController.getById", {
      method: req.method,
      url: req.originalUrl,
      query: req.query,
      params: req.params,
      body: req.body,
    });
    try {
      const order = await Order.findOne({ _id: req.params.id, user: req.user.id }).populate('prescription').populate('product');
      if (!order) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Order not found" });
      }
      res.status(HTTP_STATUS.OK).json(order);
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  },

  // [POST] /orders
  async create(req, res) {
    console.debug("[POST] /orders - orderController.create", {
      method: req.method,
      url: req.originalUrl,
      query: req.query,
      params: req.params,
      body: req.body,
    });
    try {
      const data = { ...req.body, user: req.user.id };
      const order = new Order(data);
      await order.save();
      res.status(HTTP_STATUS.CREATED).json(order);
    } catch (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
    }
  },

  // [PUT] /orders/:id
  async update(req, res) {
    console.debug("[PUT] /orders/:id - orderController.update", {
      method: req.method,
      url: req.originalUrl,
      query: req.query,
      params: req.params,
      body: req.body,
    });
    try {
      const order = await Order.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        req.body,
        { new: true, runValidators: true }
      );
      if (!order) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Order not found" });
      }
      res.status(HTTP_STATUS.OK).json(order);
    } catch (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
    }
  },

  // [DELETE] /orders/:id
  async delete(req, res) {
    console.debug("[DELETE] /orders/:id - orderController.delete", {
      method: req.method,
      url: req.originalUrl,
      query: req.query,
      params: req.params,
      body: req.body,
    });
    try {
      const order = await Order.findOneAndDelete({ _id: req.params.id, user: req.user.id });
      if (!order) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Order not found" });
      }
      res.status(HTTP_STATUS.OK).json({ message: "Order deleted successfully" });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  },
};

export default orderController;