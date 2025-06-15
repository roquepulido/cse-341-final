import mongoose from "mongoose";
const { Schema } = mongoose;

const prescriptionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sphere: { type: Number, required: true },
    cylinder: { type: Number, required: true },
    axis: { type: Number, required: true, min: 0, max: 180 },
    addition: { type: Number },
    prism: { type: Number },
    base: { type: String, enum: ["up", "down", "in", "out"], required: false },
    notes: { type: String, maxlength: 500 },
    dateIssued: { type: Date, required: true },
    expirationDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Prescription = mongoose.model(
  "Prescription",
  prescriptionSchema,
  "prescriptions"
);
export default Prescription;
