import mongoose, { Schema } from "mongoose";

const TransporterSchema = new Schema({
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
});

const Transporter =
  mongoose.models.Transporter ||
  mongoose.model("Transporter", TransporterSchema);

export default Transporter;
