"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthProvider"; // Make sure this provides transporter._id

interface Transporter {
  name: string;
  email: string;
  contact: string;
  profileImage: string;
}

const TransporterAccountPage = () => {
  const { user } = useAuth(); // transporter is treated as `user` in auth context
  const [transporterData, setTransporterData] = useState<Transporter | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransporter = async () => {
      if (!user?._id) return;

      try {
        const res = await axios.get(`/api/transporters/account?id=${user._id}`);
        setTransporterData(res.data);
      } catch (error) {
        console.error("Failed to fetch transporter details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransporter();
  }, [user]);

  if (!user)
    return (
      <p className="text-center text-error">
        Please login to view your account details.
      </p>
    );

  if (loading) return <p className="text-center">Loading...</p>;

  if (!transporterData)
    return <p className="text-center text-error">Details not found.</p>;

  return (
    <div className="max-w-2xl mx-auto bg-base-300 rounded-lg p-6 shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6 uppercase">My Account</h1>
      <div className="flex flex-col items-center gap-4">
        <img
          src={transporterData.profileImage}
          alt={transporterData.name}
          className="w-32 h-32 rounded-full object-cover border"
        />
        <p className="text-xl font-semibold">{transporterData.name}</p>
        <p>Email: {transporterData.email}</p>
        <p>Contact: {transporterData.contact}</p>
      </div>
    </div>
  );
};

export default TransporterAccountPage;
