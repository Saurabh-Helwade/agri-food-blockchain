"use client";
import { useEffect, useState } from "react";
import { Product } from "@/types/Users";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";  // <-- import router

interface Cart {
  productId: Product;
  quantity: number;
}

const CartPage = () => {
  const [cart, setCart] = useState<Cart[]>([]);
  const router = useRouter();  // <-- instantiate router

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  const removeFromCart = (productId: string) => {
    const updated = cart.filter((item) => item.productId._id !== productId);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const getTotalAmount = () => {
    return cart.reduce(
      (total, item) => total + item.quantity * item.productId.price,
      0
    );
  };

  const buyNow = async () => {
    const resPromise = axios.post("/api/user/place-order", { cart });

    toast.promise(resPromise, {
      loading: "Placing your order...",
      success: "Order Placed Successfully.",
      error: "Something went wrong!!",
    });

    try {
      const res = await resPromise;
      setCart([]);
      localStorage.removeItem("cart");

      // Redirect to orders page after success
      router.push("/user/orders");
    } catch (error) {
      // error handled by toast.promise, no action needed here
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center uppercase">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-base-content/50">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.productId._id}
                className="border rounded p-4 flex justify-between items-center"
              >
                <div>
                  <h2 className="font-bold text-lg">{item.productId.name}</h2>
                  <p className="text-sm text-base-content/70">
                    {item.productId.description}
                  </p>
                  <p className="text-sm">
                    {item.quantity} × ₹{item.productId.price} = ₹
                    {item.quantity * item.productId.price}
                  </p>
                </div>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => removeFromCart(item.productId._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-xl font-bold">Total: ₹{getTotalAmount()}</h2>
            <button className="btn btn-primary" onClick={buyNow}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
