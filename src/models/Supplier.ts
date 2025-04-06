import mongoose, { Schema } from "mongoose";

const SupplierSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Manufacturer",
  },
  transporter: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transporter",
    },
  ],
});

const Supplier =
  mongoose.models.Supplier || mongoose.model("Supplier", SupplierSchema);
export default Supplier;
