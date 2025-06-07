// src/app/api/transporters/account/route.ts

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/middlewares/db.config";
import Transporter from "@/models/Transporter";

export async function GET(request: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "Transporter ID is required." }, { status: 400 });
  }

  try {
    const transporter = await Transporter.findById(id).select(
      "name email contact profileImage"
    );

    if (!transporter) {
      return NextResponse.json({ message: "Transporter not found." }, { status: 404 });
    }

    return NextResponse.json(transporter);
  } catch (error) {
    console.error("Error fetching transporter details:", error);
    return NextResponse.json(
      { message: "Error fetching transporter details." },
      { status: 500 }
    );
  }
}
