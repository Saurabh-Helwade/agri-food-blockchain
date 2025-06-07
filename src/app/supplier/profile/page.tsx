"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthProvider";

interface Supplier {
  name: string;
  email: string;
  contact: string;
  profileImage: string;
  manufacturer?: {
    name: string;
    email: string;
    contact: string;
  };
  transporter?: Array<{
    name: string;
    contact: string;
  }>;
}

const SupplierAccountPage = () => {
  const { user } = useAuth();
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSupplier = async () => {
      if (!user?._id) return;

      try {
        const res = await axios.get(`/api/suppliers/account?id=${user._id}`);
        setSupplier(res.data);
      } catch (error) {
        console.error("Failed to fetch supplier details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSupplier();
  }, [user]);

  if (!user)
    return <p className="text-center text-error">Please login to view your account details.</p>;

  if (loading) return <p className="text-center">Loading...</p>;

  if (!supplier) return <p className="text-center text-error">Details not found.</p>;

  return (
    <div className="max-w-2xl mx-auto bg-base-300 rounded-lg p-6 shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6 uppercase">My Supplier Account</h1>
      <div className="flex flex-col items-center gap-4">
        <img
          src={supplier.profileImage}
          alt={supplier.name}
          className="w-32 h-32 rounded-full object-cover border"
        />
        <p className="text-xl font-semibold">{supplier.name}</p>
        <p>Email: {supplier.email}</p>
        <p>Contact: {supplier.contact}</p>

        {supplier.manufacturer && (
          <div className="text-center mt-4">
            <h2 className="text-lg font-bold">Manufacturer Info</h2>
            <p>{supplier.manufacturer.name}</p>
            <p>{supplier.manufacturer.email}</p>
            <p>{supplier.manufacturer.contact}</p>
          </div>
        )}

        {supplier.transporter && supplier.transporter.length > 0 && (
          <div className="text-center mt-4">
            <h2 className="text-lg font-bold">Transporters</h2>
            {supplier.transporter.map((trans, i) => (
              <div key={i}>
                <p>{trans.name}</p>
                <p>{trans.contact}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierAccountPage;
