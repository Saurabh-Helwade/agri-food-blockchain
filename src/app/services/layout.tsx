"use client";

import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import ThemeToggler from "@/components/Navbar/ThemeToggler";
import "../globals.css";

const ServicesLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <head>
        <title>Our Services | AgriFood Blockchain Platform</title>
        <meta
          name="description"
          content="Discover the services provided by AgriFood leveraging blockchain technology for secure, transparent, and decentralized agricultural food supply chain management."
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

export default ServicesLayout;
