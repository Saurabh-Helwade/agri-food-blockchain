"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Razorpay from "razorpay";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthProvider";
import Script from "next/script";
import { getContract } from "@/middlewares/blockchain.config";

interface ProductInfo {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

interface OrderProduct {
  product: ProductInfo;
  quantity: number;
}

interface OrderDetails {
  _id: string;
  orderId: string;
  totalPrice: number;
  paymentStatus: "pending" | "completed" | "failed";
  deliveryStatus: "pending" | "shipped" | "delivered";
  products: OrderProduct[];
}

const DetailsPage = () => {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const orderId = searchParams.get("id");
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrderDetails = async () => {
    try {
      const res = await axios.get(`/api/user/orders/details?id=${orderId}`);
      setOrderDetails(res.data);
    } catch (error) {
      console.error("Failed to fetch order details", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayNow = async () => {
    const contract = await getContract();
    if (!contract) {
      toast.error("Failed to fetch contract");
      return;
    }
    const centralKey = await axios.get(
      `/api/user/orders/centralKey?id=${orderId}`
    );
    const transaction = await contract.setCentralKey(centralKey.data);
    const transactionHash = await transaction.wait();
    toast.success(
      "Payment successful! Transaction Hash: " + transactionHash.transactionHash
    );
    console.log(transactionHash);
    if (!orderId) {
      toast.error("Order ID is required.");
      return;
    }
    toast.loading("Processing payment...");
    const res = await axios.post(`/api/user/orders/pay?orderId=${orderId}`);
    const options = {
      key: "rzp_test_cXJvckaWoN0JQx",
      amount: res.data.amount,
      currency: "INR",
      name: "AgriFood",
      description: "Test Transaction",
      image: "/bg.png",
      order_id: res.data.orderId,
      callback_url: "http://localhost:3000/user/details" + `?id=${orderId}`,
      prefill: {
        name: user?.name,
        email: user?.email,
        contact: user?.contact,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", function (response: any) {
      alert(response.error.description);
    });
    paymentObject.open();
    toast.dismiss();
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);
  if (!user)
    return (
      <p className="text-center text-error">
        Please login to view order details.
      </p>
    );
  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <h1 className="text-4xl font-bold mb-6 text-center uppercase">
        Order Details
      </h1>

      {loading ? (
        <p className="text-center text-base-content">Loading...</p>
      ) : orderDetails ? (
        <div className="bg-base-300 rounded-lg shadow-lg p-6 space-y-4">
          <div>
            <p className="text-lg">
              <span className="font-semibold">Order ID:</span>{" "}
              {orderDetails.orderId}
            </p>
            <p>
              <span className="font-semibold">Total Price:</span> ₹
              {orderDetails.totalPrice}
            </p>
            <p>
              <span className="font-semibold">Payment Status:</span>{" "}
              <span
                className={`badge ${
                  orderDetails.paymentStatus === "pending"
                    ? "badge-warning"
                    : "badge-success"
                }`}
              >
                {orderDetails.paymentStatus}
              </span>
            </p>
            <p>
              <span className="font-semibold">Delivery Status:</span>{" "}
              <span
                className={`badge ${
                  orderDetails.deliveryStatus === "pending"
                    ? "badge-neutral"
                    : orderDetails.deliveryStatus === "shipped"
                    ? "badge-info"
                    : "badge-success"
                }`}
              >
                {orderDetails.deliveryStatus}
              </span>
            </p>
          </div>

          <h2 className="text-xl font-bold mt-4">Products</h2>
          <ul className="space-y-3">
            {orderDetails.products.map((productItem) => (
              <li
                key={productItem.product._id}
                className="flex items-center gap-4 border rounded p-3"
              >
                <img
                  src={productItem.product.imageUrl}
                  alt={productItem.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold">{productItem.product.name}</p>
                  <p className="text-sm text-base-content/70">
                    ₹{productItem.product.price} x {productItem.quantity}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {orderDetails.paymentStatus === "pending" && (
            <button
              onClick={handlePayNow}
              className="btn btn-primary mt-6 w-full"
            >
              Pay Now
            </button>
          )}
        </div>
      ) : (
        <p className="text-center text-error">Order not found.</p>
      )}
    </>
  );
};

export default DetailsPage;
