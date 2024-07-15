import { useEffect, useState } from "react";
import { useTanstackMutation, useTanstackQuery } from "../../../common/hooks/useTanstackQuery";
import { toast } from "react-toastify";
import { axiosPatch } from "../../../config/axios";
import { useLocation } from "react-router-dom";
import Pageination from "../../UI/Pagination";
import { useHookSearch } from "../../../common/hooks/useSearch";

const Orders = () => {
  const useSearch = useHookSearch();
  const search = new URLSearchParams(useLocation().search);
  const page = search.get('page') || 1;
  const status = search.get('status') || '';
  const { data, refetch } = useTanstackQuery("orders", { orderStatus: status, page, limit: 6 }, false);
  const { mutate } = useTanstackMutation("orders/cancel", "PATCH");
  useEffect(() => {
    refetch();
  }, [status, page]);
  const setStatus = (status) => {
    useSearch({ status }, '/profile/orders');
  };
  return (
    <div className="orders-container mx-auto mt-10">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Đơn Hàng Của Tôi</h1>
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setStatus("")}
            className={`btn ${status === "" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setStatus("pending")}
            className={`btn ${status === "pending" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Chờ thanh toán
          </button>
          <button
            onClick={() => setStatus("confirmed")}
            className={`btn ${status === "confirmed" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Chờ nhận hàng
          </button>
          <button
            onClick={() => setStatus("done")}
            className={`btn ${status === "done" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Hoàn thành
          </button>
          <button
            onClick={() => setStatus("canceled")}
            className={`btn ${status === "canceled" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
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
              <th className="py-2">Payments</th>
              <th className="py-2">Tổng tiền</th>
              <th className="py-2">Trạng thái</th>
              <th className="py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {!data?.metadata.docs.length ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  Không có đơn hàng nào
                </td>
              </tr>
            ) : (
              data?.metadata?.docs?.map((order) => (
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
                      <div key={index + 1} className="flex items-center space-x-4">
                        <img src={item.image} className="w-16 h-16 object-cover" alt={item.name} />
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

                  <td className="border px-4 py-2">{order.paymentMethod}</td>
                  <td className="border px-4 py-2">{order.totalPrice}</td>

                  <td className="border px-4 py-2">{order.orderStatus}</td>
                  <td className="border px-4 py-2">
                    {order.orderStatus === "pending" && (
                      <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={() => mutate({ orderId: order._id })}>Hủy Đơn</button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <Pageination data={data?.metadata} />
      </div>
    </div>
  );
};

export default Orders;
