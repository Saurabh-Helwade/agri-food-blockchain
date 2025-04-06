import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema({
  orderId: {
    type: String,
    required: true,
  },
  centralKey: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  supplierId: {
    type: Schema.Types.ObjectId,
    ref: "Supplier",
    required: true,
  },
  transporterId: {
    type: Schema.Types.ObjectId,
    ref: "Transporter",
  },
  manufacturerId: {
    type: Schema.Types.ObjectId,
    ref: "Manufacturer",
    required: true,
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  deliveryStatus: {
    type: String,
    enum: ["pending", "shipped", "delivered"],
    default: "pending",
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default Order;
