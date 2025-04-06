"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/api/user/orders");
      setOrders(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center uppercase">
        Your Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-base-content">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {orders.map((order: any) => (
            <div
              key={order._id}
              className="card w-96 bg-base-300 card-md shadow-sm"
            >
              <div className="card-body">
                <h2 className="card-title">Order ID: {order.orderId}</h2>
                <p>Total Price: ₹{order.totalPrice}</p>
                <p className="capitalize">Payment: {order.paymentStatus}</p>
                <p className="capitalize">Delivery: {order.deliveryStatus}</p>
                <div className="card-actions">
                  <Link
                    href={`/user/details?id=${order._id}`}
                    className="btn btn-primary w-full"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
