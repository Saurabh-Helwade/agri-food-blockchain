import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import dbConfig from "@/middlewares/db.config";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import Manufacturer from "@/models/Manufacturer";
import Suppiler from "@/models/Supplier";
import Transporter from "@/models/Transporter";

dbConfig();

const generateToken = (data: object) => {
  return jwt.sign(data, process.env.JWT_SECRET!, { expiresIn: "1d" });
};

const setTokenCookie = (response: NextResponse, token: string) => {
  response.cookies.set("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  });
};

export async function POST(req: NextRequest) {
  const { formData } = await req.json();

  if (!formData.email || !formData.password) {
    return NextResponse.json(
      { message: "Please fill all the fields", success: false },
      { status: 400 }
    );
  }

  if (
    formData.email === process.env.ADMIN_EMAIL &&
    formData.password === process.env.ADMIN_PASSWORD
  ) {
    const data = {
      id: "admin",
      role: "admin",
      email: process.env.ADMIN_EMAIL,
      name: "Admin",
      profileImage:
        "https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-man-user-icon.png",
      isVerified: true,
    };
    const token = generateToken(data);
    const response = NextResponse.json({
      message: "Login Success",
      success: true,
      route: `/admin/dashboard`,
      user: data,
    });
    setTokenCookie(response, token);
    return response;
  }
  try {
    if (formData.role === "manufacturer") {
      const user = await Manufacturer.findOne({
        email: formData.email,
      });
      if (!user) {
        return NextResponse.json(
          { message: "Manufacturer not found", success: false },
          { status: 404 }
        );
      }
      const isMatch = await bcryptjs.compare(formData.password, user.password);
      if (!isMatch) {
        return NextResponse.json(
          { message: "Invalid credentials", success: false },
          { status: 401 }
        );
      }
      const token = generateToken({
        id: user._id,
        role: "manufacturer",
        email: user.email,
        name: user.name,
        profilImage: user.profileImage,
      });
      const response = NextResponse.json({
        message: "Login Success",
        success: true,
        route: `/manufacturer/dashboard`,
        user,
      });
      setTokenCookie(response, token);
      return response;
    } else if (formData.role === "supplier") {
      const user = await Suppiler.findOne({
        email: formData.email,
      });
      if (!user) {
        return NextResponse.json(
          { message: "Supplier not found", success: false },
          { status: 404 }
        );
      }
      const isMatch = await bcryptjs.compare(formData.password, user.password);
      if (!isMatch) {
        return NextResponse.json(
          { message: "Invalid credentials", success: false },
          { status: 401 }
        );
      }
      const token = generateToken({
        id: user._id,
        role: "supplier",
        email: user.email,
        name: user.name,
        profilImage: user.profileImage,
      });
      const response = NextResponse.json({
        message: "Login Success",
        success: true,
        route: `/supplier/dashboard`,
        user,
      });
      setTokenCookie(response, token);
      return response;
    } else if (formData.role === "transporter") {
      const user = await Transporter.findOne({
        email: formData.email,
      });
      if (!user) {
        return NextResponse.json(
          { message: "Transporter not found", success: false },
          { status: 404 }
        );
      }
      const isMatch = await bcryptjs.compare(formData.password, user.password);
      if (!isMatch) {
        return NextResponse.json(
          { message: "Invalid credentials", success: false },
          { status: 401 }
        );
      }
      const token = generateToken({
        id: user._id,
        role: "transporter",
        email: user.email,
        name: user.name,
        profilImage: user.profileImage,
      });
      const response = NextResponse.json({
        message: "Login Success",
        success: true,
        route: `/transporter/dashboard`,
        user,
      });
      setTokenCookie(response, token);
      return response;
    } else if (formData.role === "consumer") {
      const user = await User.findOne({
        email: formData.email,
      });
      if (!user) {
        return NextResponse.json(
          { message: "User not found", success: false },
          { status: 404 }
        );
      }
      const isMatch = await bcryptjs.compare(formData.password, user.password);
      if (!isMatch) {
        return NextResponse.json(
          { message: "Invalid credentials", success: false },
          { status: 401 }
        );
      }
      const token = generateToken({
        id: user._id,
        role: "user",
        email: user.email,
        name: user.name,
        profilImage: user.profileImage,
      });
      const response = NextResponse.json({
        message: "Login Success",
        success: true,
        route: `/user/dashboard`,
        user,
      });
      setTokenCookie(response, token);
      return response;
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong", success: false },
      { status: 500 }
    );
  }
}
