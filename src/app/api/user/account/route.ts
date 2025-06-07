// src/app/api/user/account/route.ts

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/middlewares/db.config";
import User from "@/models/User";

export async function GET(request: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "User ID is required." }, { status: 400 });
  }

  try {
    const user = await User.findById(id).select(
      "name email contact profileImage address"
    );

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching user details." },
      { status: 500 }
    );
  }
}
