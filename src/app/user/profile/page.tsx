"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthProvider"; // your auth context

interface User {
  name: string;
  email: string;
  contact: string;
  profileImage: string;
  address: {
    address: string;
    district: string;
    state: string;
    pincode: string;
  };
}

const UserAccountPage = () => {
  const { user } = useAuth(); // user._id expected here
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user?._id) return;

      try {
        const res = await axios.get(`/api/user/account?id=${user._id}`);
        setUserData(res.data);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  if (!user)
    return (
      <p className="text-center text-error">
        Please login to view your account details.
      </p>
    );

  if (loading) return <p className="text-center">Loading...</p>;

  if (!userData)
    return <p className="text-center text-error">Details not found.</p>;

  return (
    <div className="max-w-2xl mx-auto bg-base-300 rounded-lg p-6 shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6 uppercase">My Account</h1>
      <div className="flex flex-col items-center gap-4">
        <img
          src={userData.profileImage}
          alt={userData.name}
          className="w-32 h-32 rounded-full object-cover border"
        />
        <p className="text-xl font-semibold">{userData.name}</p>
        <p>Email: {userData.email}</p>
        <p>Contact: {userData.contact}</p>
        <div className="text-center mt-4">
          <h2 className="text-lg font-bold">Address</h2>
          <p>{userData.address.address}</p>
          <p>
            {userData.address.district}, {userData.address.state} -{" "}
            {userData.address.pincode}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserAccountPage;
