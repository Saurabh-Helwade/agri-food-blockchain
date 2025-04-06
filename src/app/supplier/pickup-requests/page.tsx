"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SupplierOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [transporters, setTransporters] = useState([]);
  const [selectedTransporter, setSelectedTransporter] = useState<{
    [key: string]: string;
  }>({});

  const fetchOrders = async () => {
    const res = await axios.get("/api/suppliers/orders");
    setOrders(res.data);
  };

  const fetchTransporters = async () => {
    const res = await axios.get("/api/transporters");
    setTransporters(res.data);
  };

  useEffect(() => {
    fetchOrders();
    fetchTransporters();
  }, []);

  const handleAssign = async (orderId: string) => {
    const transporterId = selectedTransporter[orderId];
    if (!transporterId) {
      toast.error("Please select a transporter");
      return;
    }

    try {
      const res = axios.post("/api/suppliers/assign-order", {
        orderId,
        transporterId,
      });
      toast.promise(res, {
        loading: "Assigning order...",
        success: () => {
          fetchOrders();
          return "Order assigned successfully";
        },
        error: "Failed to assign order",
      });
    } catch (err) {
      toast.error("Failed to assign order");
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-center mb-6">
        Assign Orders to Transporters
      </h1>
      <div className="overflow-x-auto bg-base-300 rounded-lg">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Total Price</th>
              <th>Payment Status</th>
              <th>Delivery Status</th>
              <th>Assign To</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any, index: number) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{order.orderId}</td>
                <td>₹{order.totalPrice}</td>
                <td className="capitalize">{order.paymentStatus}</td>
                <td className="capitalize">{order.deliveryStatus}</td>
                <td>
                  {order.transporterId ? (
                    <span>{order.transporterId.name} </span>
                  ) : (
                    <select
                      className="select select-bordered w-full max-w-xs"
                      onChange={(e) =>
                        setSelectedTransporter((prev) => ({
                          ...prev,
                          [order._id]: e.target.value,
                        }))
                      }
                    >
                      <option value="">Select Transporter</option>
                      {transporters.map((transporter: any) => (
                        <option key={transporter._id} value={transporter._id}>
                          {transporter.name}
                        </option>
                      ))}
                    </select>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleAssign(order._id)}
                    className="btn btn-primary"
                    disabled={
                      order.transporterId || !selectedTransporter[order._id]
                    }
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SupplierOrdersPage;
