import User from "../models/User.js";
import { HTTP_STATUS } from "../utils/const.js";

const userController = {
  async getAllUsers(req, res) {
    console.debug("[GET] /users - userController.getAllUsers", {
      method: req.method,
      url: req.originalUrl,
      query: req.query,
      params: req.params,
      body: req.body,
    });
    try {
      const users = await User.find();
      res.status(HTTP_STATUS.OK).json(users);
    } catch (error) {
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  },

  async getUserById(req, res) {
    console.debug("[GET] /users/:id - userController.getUserById", {
      method: req.method,
      url: req.originalUrl,
      query: req.query,
      params: req.params,
      body: req.body,
    });
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ message: "User not found" });
      }
      res.status(HTTP_STATUS.OK).json(user);
    } catch (error) {
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  },

  async createUser(req, res) {
    console.debug("[POST] /users - userController.createUser", {
      method: req.method,
      url: req.originalUrl,
      query: req.query,
      params: req.params,
      body: req.body,
    });
    const { oauthId, email, name, profilePicture, type } = req.body;
    const newUser = new User({
      oauthId,
      email,
      name,
      profilePicture,
      type, 
    });

    try {
      const savedUser = await newUser.save();
      res.status(HTTP_STATUS.CREATED).json(savedUser);
    } catch (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
    }
  },
  updateUser: async (req, res) => {
    console.debug("[PUT] /users/:id - userController.updateUser", {
      method: req.method,
      url: req.originalUrl,
      query: req.query,
      params: req.params,
      body: req.body,
    });
    try {
      const { oauthId, email, name, profilePicture, type } = req.body;
      const updateData = { oauthId, email, name, profilePicture, type };
      // Remove undefined properties from updateData
      Object.keys(updateData).forEach(
        (key) => updateData[key] === undefined && delete updateData[key]
      );
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );
      if (!updatedUser) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ message: "User not found" });
      }
      res.status(HTTP_STATUS.OK).json(updatedUser);
    } catch (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
    }
  },
  // Delete a user by ID
  deleteUser: async (req, res) => {
    console.debug("[DELETE] /users/:id - userController.deleteUser", {
      method: req.method,
      url: req.originalUrl,
      query: req.query,
      params: req.params,
      body: req.body,
    });
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ message: "User not found" });
      }
      res.status(HTTP_STATUS.OK).json({ message: "User deleted successfully" });
    } catch (error) {
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  },
};

export default userController;
