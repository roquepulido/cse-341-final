import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    type: {
      type: String,
      enum: ["eyeglasses", "sunglasses", "contact_lenses"],
      required: true,
      default: "eyeglasses",
    },
    description: { type: String },
    stock: { type: Number, default: 0 },
    attributes: {
      frameMaterial: { type: String }, // eyeglasses, sunglasses
      frameColor: { type: String }, // eyeglasses, sunglasses
      lensMaterial: { type: String }, // eyeglasses, sunglasses
      lensColor: { type: String }, // eyeglasses, sunglasses
      gender: {
        type: String,
        enum: ["male", "female", "unisex"],
        default: "unisex",
      }, // eyeglasses, sunglasses
      shape: { type: String }, // eyeglasses, sunglasses
      lensType: { type: String }, // contact_lenses
      power: { type: String }, // contact_lenses
      baseCurve: { type: String }, // contact_lenses
      diameter: { type: String }, // contact_lenses
      material: { type: String }, // contact_lenses
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema, "products");
export default Product;
