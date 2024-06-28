import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const Orders = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const userId = localStorage.getItem("userId");

  const { data, error, isLoading } = useQuery({
    queryKey: ["UserOrders", userId, statusFilter],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User is not logged in");
      }
      const response = await axios.get(
        `http://localhost:3000/users/${userId}/orders`
      );
      return response.data;
    },
    enabled: !!userId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const filteredOrders =
    statusFilter === "all"
      ? data?.orders ?? []
      : data?.orders.filter((order) => order.status === statusFilter) ?? [];

  return (
    <div className="orders-container max-w-5xl mx-auto mt-10">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Đơn Hàng Của Tôi</h1>
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setStatusFilter("all")}
            className={`btn ${
              statusFilter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setStatusFilter("pending")}
            className={`btn ${
              statusFilter === "pending"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Chờ thanh toán
          </button>
          <button
            onClick={() => setStatusFilter("shipping")}
            className={`btn ${
              statusFilter === "shipping"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Chờ nhận hàng
          </button>
          <button
            onClick={() => setStatusFilter("completed")}
            className={`btn ${
              statusFilter === "completed"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Hoàn thành
          </button>
          <button
            onClick={() => setStatusFilter("cancelled")}
            className={`btn ${
              statusFilter === "cancelled"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Đã hủy
          </button>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">ID</th>
              <th className="py-2">Ngày</th>
              <th className="py-2">Sản phẩm</th>
              <th className="py-2">Số lượng</th>
              <th className="py-2">Tổng tiền</th>
              <th className="py-2">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="border px-4 py-2">{order.id}</td>
                <td className="border px-4 py-2">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  <ul>
                    {order.items.map((item) => (
                      <li key={item.productId}>{item.productName}</li>
                    ))}
                  </ul>
                </td>
                <td className="border px-4 py-2">
                  <ul>
                    {order.items.map((item) => (
                      <li key={item.productId}>{item.quantity}</li>
                    ))}
                  </ul>
                </td>
                <td className="border px-4 py-2">{order.total}</td>
                <td className="border px-4 py-2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
