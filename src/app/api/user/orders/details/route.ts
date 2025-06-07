import Order from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/middlewares/db.config";

// GET request to fetch order details
export async function GET(req: NextRequest) {
  await connectDB();

  const searchParams = req.nextUrl.searchParams;
  const orderId = searchParams.get("id");

  if (!orderId) {
    return NextResponse.json(
      { message: "Order ID is required" },
      { status: 400 }
    );
  }

  try {
    const order = await Order.findById(orderId)
      .populate("products.product")
      .populate("userId")
      .populate("manufacturerId")
      .populate("supplierId")
      .populate("transporterId");

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE request to cancel order
export async function DELETE(req: NextRequest) {
  await connectDB();

  const searchParams = req.nextUrl.searchParams;
  const orderId = searchParams.get("id");

  if (!orderId) {
    return NextResponse.json(
      { message: "Order ID is required" },
      { status: 400 }
    );
  }

  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Order cancelled successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error cancelling order:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
