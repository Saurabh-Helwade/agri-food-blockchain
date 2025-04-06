import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Product from "@/models/Product";
import dbConfig from "@/middlewares/db.config";
dbConfig();
export async function POST(req: NextRequest) {
  const { products } = await req.json();
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const newProduct = await Product.create({
      ...products,
      productCode: products.name.replace(/\s+/g, "-").toLowerCase(),
      supplierId: products.supplier,
      manufacturerId: data.id,
    });
    await newProduct.save();
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
