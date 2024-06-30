import { useState } from "react";
import { useTanstackQuery } from "../../../common/hooks/useTanstackQuery";
import { useQuery } from "@tanstack/react-query";
// import { axiosGet } from "../../../config/axios";
import axios from "axios";

const Orders = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  // const userId = localStorage.getItem("id");

  // const id = '6679bf822c2a62b7b759b119';

  // const { data:order } =  useTanstackQuery(`orders`);
  // const { data:product } = useTanstackQuery(`products`) : { data: null };

  const { data } = useQuery({
    queryKey: ["orders_detail"],
    queryFn: async () => {
      const data = await axios.get(
        `http://localhost:8000/api/orders/by_user/6679bf822c2a62b7b759b119`
      );
      console.log(data);
      return data;
    },
  });

  // const filteredOrders =
  //   statusFilter === "all"
  //     ? data?.orders ?? []
  //     : data?.orders.filter((order) => order.status === statusFilter) ?? [];

  return (
    <div className="orders-container mx-auto mt-10">
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
              <th className="py-2">Mã đơn</th>
              <th className="py-2">Ngày</th>
              <th className="py-2">Sản phẩm</th>
              <th className="py-2">Số lượng</th>
              <th className="py-2">Tổng tiền</th>
              <th className="py-2">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.metadata?.docs?.map((order) => (
              <tr key={order._id}>
                <td className="border px-4 py-2">{order._id}</td>
                <td className="border px-4 py-2">
                  {new Date(order.updatedAt).toLocaleString([], {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </td>
                <td className="border px-4 py-2">
                  {order.items.map((item, index) => (
                    <div
                      key={index + 1}
                      className="flex items-center space-x-4"
                    >
                      <img
                        src={item.image}
                        className="w-16 h-16 object-cover"
                        alt={item.name}
                      />
                      <div>
                        <p className="">{item.name}</p>
                        <p>Giá: {item.price}</p>
                      </div>
                    </div>
                  ))}
                </td>
                <td className="border px-4 py-2">
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index + 1}>{item.quantity}</li>
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
