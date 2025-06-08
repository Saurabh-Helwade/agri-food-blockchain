"use client";

import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import ThemeToggler from "@/components/Navbar/ThemeToggler";
import "../globals.css";

const ContactLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <head>
        <title>Contact Us | AgriFood Blockchain Platform</title>
        <meta
          name="description"
          content="Get in touch with the AgriFood team. Reach out with questions, suggestions, or collaboration opportunities related to our blockchain-powered agri-supply chain platform."
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

export default ContactLayout;
