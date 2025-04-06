import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConfig from "@/middlewares/db.config";

import User from "@/models/User";
import Manufacturer from "@/models/Manufacturer";
import Suppiler from "@/models/Supplier";
import Transporter from "@/models/Transporter";
dbConfig();

export async function POST(req: NextRequest) {
  try {
    const { formData } = await req.json();

    if (formData.password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }
    if (formData.role === "manufacturer") {
      const exisitingManufacturer = await Manufacturer.findOne({
        email: formData.email,
      });
      if (exisitingManufacturer) {
        return NextResponse.json(
          { message: "Manufacturer already exists" },
          { status: 400 }
        );
      }
      const hashedPassword = await bcrypt.hash(formData.password, 10);
      const newManufacturer = new Manufacturer({
        ...formData,
        password: hashedPassword,
      });
      await newManufacturer.save();
      return NextResponse.json(
        { message: "Manufacturer created successfully" },
        { status: 201 }
      );
    } else if (formData.role === "supplier") {
      const exisitingSupplier = await Suppiler.findOne({
        email: formData.email,
      });
      if (exisitingSupplier) {
        return NextResponse.json(
          { message: "Supplier already exists" },
          { status: 400 }
        );
      }
      const hashedPassword = await bcrypt.hash(formData.password, 10);
      const newSupplier = new Suppiler({
        ...formData,
        password: hashedPassword,
      });
      await newSupplier.save();
      return NextResponse.json(
        { message: "Supplier created successfully" },
        { status: 201 }
      );
    } else if (formData.role === "transporter") {
      const exisitingTransporter = await Transporter.findOne({
        email: formData.email,
      });
      if (exisitingTransporter) {
        return NextResponse.json(
          { message: "Transporter already exists" },
          { status: 400 }
        );
      }
      const hashedPassword = await bcrypt.hash(formData.password, 10);
      const newTransporter = new Transporter({
        ...formData,
        password: hashedPassword,
      });
      await newTransporter.save();
      return NextResponse.json(
        { message: "Transporter created successfully" },
        { status: 201 }
      );
    } else {
      const exisitingUser = await User.findOne({ email: formData.email });
      if (exisitingUser) {
        return NextResponse.json(
          { message: "User already exists" },
          { status: 400 }
        );
      }
      const hashedPassword = await bcrypt.hash(formData.password, 10);
      const newUser = new User({
        ...formData,
        password: hashedPassword,
      });
      await newUser.save();
      return NextResponse.json(
        {
          message: "User created successfully",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
