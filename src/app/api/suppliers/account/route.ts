import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/middlewares/db.config";
import Supplier from "@/models/Supplier";

export async function GET(request: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "Supplier ID is required" }, { status: 400 });
  }

  try {
    const supplier = await Supplier.findById(id)
      .populate("manufacturer", "name email contact")
      .populate("transporter", "name contact");

    if (!supplier) {
      return NextResponse.json({ message: "Supplier not found" }, { status: 404 });
    }

    return NextResponse.json(supplier);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching supplier details" }, { status: 500 });
  }
}
