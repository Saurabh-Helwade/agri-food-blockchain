import dbConfig from "@/middlewares/db.config";
import Manufacturer from "@/models/Manufacturer";
import Supplier from "@/models/Supplier";
import Transporter from "@/models/Transporter";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "No token found" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
      role: string;
    };
    if (!data) {
      return NextResponse.json({ error: "Invalid token" });
    }
    if (!data.id) {
      return NextResponse.json({ error: "Invalid token" });
    }
    if (data.role === "manufacturer") {
      const user = await Manufacturer.findOne({ _id: data.id });
      if (!user) {
        return NextResponse.json({ error: "User not found" });
      }
      return NextResponse.json({ user, status: 200 });
    } else if (data.role === "supplier") {
      const user = await Supplier.findOne({ _id: data.id });
      if (!user) {
        return NextResponse.json({ error: "User not found" });
      }
      return NextResponse.json({ user, status: 200 });
    } else if (data.role === "transporter") {
      const user = await Transporter.findOne({ _id: data.id });
      if (!user) {
        return NextResponse.json({ error: "User not found" });
      }
      return NextResponse.json({ user, status: 200 });
    }
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }
    return NextResponse.json({ user, status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err }, { status: 401 });
  }
}
