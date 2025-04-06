"use client";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthProvider";

const Component = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <head>
        <title>AgriFood - From Farm to Fork, Secured by Blockchain.</title>
        <meta
          name="description"
          content="AgriFood is a blockchain-based agri-food supply chain platform that ensures transparency, traceability, and trust across farmers, suppliers, transporters, and consumers. Track every product from farm to fork with secure smart contracts and real-time updates."
        />
      </head>
      <body className={`antialiased`}>
        <Toaster />
        <Navbar />
        {children}
      </body>
    </html>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <Component>{children}</Component>
    </AuthProvider>
  );
}
