// src/app/api/manufacturer/account/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/middlewares/db.config";
import Manufacturer from "@/models/Manufacturer";

export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "Manufacturer ID is required." }, { status: 400 });
  }

  try {
    const manufacturer = await Manufacturer.findById(id).select(
      "name email contact profileImage address"
    );

    if (!manufacturer) {
      return NextResponse.json({ message: "Manufacturer not found." }, { status: 404 });
    }

    return NextResponse.json(manufacturer, { status: 200 });
  } catch (error) {
    console.error("Error fetching manufacturer:", error);
    return NextResponse.json({ message: "Error fetching account details." }, { status: 500 });
  }
}
