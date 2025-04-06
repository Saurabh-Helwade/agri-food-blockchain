"use client";
import { Product } from "@/types/Users";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SupplierPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/suppliers/products");
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold mb-6 text-center uppercase">
        Your Products
      </h1>
      {products.length === 0 ? (
        <p className="text-center text-base-content/50 mt-6">
          No products available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="card bg-base-300 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <figure className="w-full h-48 overflow-hidden">
                <img
                  src={product.imageUrl || "/placeholder.jpg"}
                  alt={product.name}
                  className="object-contain w-full h-full"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-xl">{product.name}</h2>
                <p className="text-base-content/70 text-sm">
                  {product.description}
                </p>
                <div className="mt-4">
                  <span className="font-semibold">Quantity:</span>{" "}
                  {product.stock}
                </div>
                <div className="mt-1">
                  <span className="font-semibold">Category:</span>{" "}
                  {product.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SupplierPage;
