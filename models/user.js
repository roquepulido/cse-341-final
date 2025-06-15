import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    oauthId: {
      type: String,
      required: true,
      unique: true, 
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please fill a valid email address"],
      minlength: [5, "Email must be at least 5 characters"],
      maxlength: [100, "Email must be less than 100 characters"],
    },
    name: {
      type: String,
      required: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name must be less than 50 characters"],
    },
    profilePicture: {
      type: String,
    },
    type: {
      type: String,
      enum: ["user", "admin", "worker"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema, "users");
export default User;
