import mongoose, { Schema } from "mongoose";

const ManufacturerSchema = new Schema({
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
  address: {
    address: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
  },
  suppliers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Suppiler",
    },
  ],
  password: {
    type: String,
    required: true,
  },
});

const Manufacturer =
  mongoose.models.Manufacturer ||
  mongoose.model("Manufacturer", ManufacturerSchema);
export default Manufacturer;
