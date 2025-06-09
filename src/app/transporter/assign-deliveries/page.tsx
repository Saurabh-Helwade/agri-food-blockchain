"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AssignDeliveries = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/api/transporters/orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const res = await axios.put(
        `/api/transporters/updateOrder?orderId=${orderId}&deliveryStatus=${newStatus}`
      );

      toast.promise(Promise.resolve(res), {
        loading: "Updating status...",
        success: () => {
          fetchOrders();
          return "Status updated successfully!";
        },
        error: "Failed to update status.",
      });
    } catch (err) {
      console.error("Failed to update status:", err);
      toast.error("Failed to update status.");
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-6 text-center uppercase">
        Assigned Deliveries
      </h1>

      <div className="overflow-x-auto bg-base-300 rounded-lg">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Address</th>
              <th>Payment Status</th>
              <th>Delivery Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No deliveries assigned yet.
                </td>
              </tr>
            )}
            {orders.map((order: any, index: number) => {
              const paymentCompleted =
                order.paymentStatus?.toLowerCase() === "completed";

              return (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order.orderId}</td>
                  <td>
                    {order.userId?.address?.address},{" "}
                    {order.userId?.address?.district},{" "}
                    {order.userId?.address?.state} -{" "}
                    {order.userId?.address?.pincode}
                  </td>
                  <td className="capitalize">{order.paymentStatus}</td>
                  <td className="capitalize">{order.deliveryStatus}</td>
                  <td>
                    {!paymentCompleted ? (
                      <span className="text-red-500 text-sm">
                        Payment not completed
                      </span>
                    ) : order.deliveryStatus !== "delivered" ? (
                      <select
                        className="select select-sm select-bordered"
                        value={order.deliveryStatus}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    ) : (
                      <span className="text-green-600 font-semibold">
                        Delivered
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AssignDeliveries;
