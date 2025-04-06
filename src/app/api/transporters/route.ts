import Transporter from "@/models/Transporter";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const transporter = await Transporter.find({});
  return NextResponse.json(transporter, { status: 200 });
}
