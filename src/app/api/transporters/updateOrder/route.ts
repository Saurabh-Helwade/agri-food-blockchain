import Order from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const orderId = searchParams.get("orderId");
  const deliveryStatus = searchParams.get("deliveryStatus");
  try {
    if (!orderId || !deliveryStatus) {
      return NextResponse.json(
        { message: "Order ID and delivery status are required" },
        { status: 400 }
      );
    }

    const order = await Order.findOneAndUpdate({
      orderId,
      deliveryStatus,
    });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
