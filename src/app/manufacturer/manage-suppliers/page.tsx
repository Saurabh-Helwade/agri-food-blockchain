"use client";

import { useAuth } from "@/context/AuthProvider";
import { Supplier } from "@/types/Users";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ManufacturerProductPage = () => {
  const { user } = useAuth();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const fetchSuppliers = async () => {
    try {
      const res = await axios.get("/api/manufacturer/suppliers");
      setSuppliers(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch suppliers");
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleHireSupplier = async (supplierId: string) => {
    try {
      const res = axios.post("/api/manufacturer/hire-supplier", {
        supplierId,
      });
      toast.promise(res, {
        loading: "Hiring supplier...",
        success: "Supplier hired successfully",
        error: "Failed to hire supplier",
      });
      await res; // Wait for the promise to resolve before refetching
      fetchSuppliers();
    } catch (error) {
      console.error(error);
      toast.error("Failed to hire supplier");
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-6 text-center uppercase">
          Please login to continue
        </h1>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-4xl font-bold mb-6 text-center uppercase">
        Manage Suppliers
      </h1>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-200 mt-6">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Transporter</th>
              <th>Hire</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.length > 0 ? (
              suppliers.map((supplier, index) => (
                <tr key={supplier._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={supplier.profileImage}
                            alt={supplier.name}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{supplier.name}</div>
                        <div className="text-sm opacity-50">
                          {supplier.contact}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{supplier.email}</td>
                  <td>{supplier.transporter?.length || "NA"}</td>
                  <th>
                    {supplier.manufacturer?._id ? (
                      <button className="btn btn-primary" disabled>
                        Hired
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        onClick={() => handleHireSupplier(supplier._id!)}
                      >
                        Hire
                      </button>
                    )}
                  </th>
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <td colSpan={5} className="text-lg font-semibold text-error">
                  No suppliers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManufacturerProductPage;
