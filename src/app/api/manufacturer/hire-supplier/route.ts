import Manufacturer from "@/models/Manufacturer";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Supplier from "@/models/Supplier";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const { supplierId } = await req.json();
    const data = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };
    const manufacturer = await Manufacturer.findById(data.id);
    if (!manufacturer) {
      return NextResponse.json(
        { message: "Manufacturer not found" },
        { status: 404 }
      );
    }
    manufacturer.suppliers.push(supplierId);
    const supplier = await Supplier.findById(supplierId);
    if (!supplier) {
      return NextResponse.json(
        { message: "Supplier not found" },
        { status: 404 }
      );
    }
    supplier.manufacturer = manufacturer._id;
    await manufacturer.save();
    await supplier.save();
    return NextResponse.json(
      { message: "Supplier hired successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in hire supplier:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
