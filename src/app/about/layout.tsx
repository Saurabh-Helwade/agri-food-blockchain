"use client";

import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import ThemeToggler from "@/components/Navbar/ThemeToggler";
import "../globals.css";

const AboutLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <head>
        <title>About AgriFood | Transparency in Agri Supply Chain</title>
        <meta
          name="description"
          content="Learn more about AgriFood, the blockchain-powered platform transforming the agriculture supply chain with transparency, traceability, and trust."
        />
      </head>
      <body className="antialiased bg-base-200 text-base-content min-h-screen flex flex-col">
        <Toaster />
        <Navbar />

        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
};

export default AboutLayout;
