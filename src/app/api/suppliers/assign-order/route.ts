import Order from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { orderId, transporterId } = await req.json();
  try {
    if (!orderId || !transporterId) {
      return NextResponse.json(
        { message: "Order ID and Transporter ID are required" },
        { status: 400 }
      );
    }
    const order = await Order.findById(orderId);
    order.transporterId = transporterId;
    order.save();
    return NextResponse.json(
      { message: "Order assigned successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error assigning order:", error);
    return NextResponse.json(
      { message: "Error assigning order" },
      { status: 500 }
    );
  }
}
