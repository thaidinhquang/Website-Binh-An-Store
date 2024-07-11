import { useEffect, useState } from "react";
import { useTanstackQuery } from "../../../common/hooks/useTanstackQuery";
import instance from "../../../config/axios";

const Orders = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const { data, refetch } = useTanstackQuery("orders/by_user", { orderStatus: statusFilter }, false);
  console.log(data);

  useEffect(() => {
    // Refetch data whenever the statusFilter changes
    refetch();
  }, [statusFilter, refetch]);
  const handleCancelOrder = async (orderId) => {
    try {
      // Perform an API call to update the order status to "cancelled"
      await instance.patch(`orders/cancel`, { orderId });
      // Refetch orders after update
      refetch();
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  return (
    <div className="orders-container mx-auto mt-10">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Đơn Hàng Của Tôi</h1>
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setStatusFilter("")}
            className={`btn ${statusFilter === "" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setStatusFilter("pending")}
            className={`btn ${statusFilter === "pending" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Chờ thanh toán
          </button>
          <button
            onClick={() => setStatusFilter("shipping")}
            className={`btn ${statusFilter === "shipping" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Chờ nhận hàng
          </button>
          <button
            onClick={() => setStatusFilter("completed")}
            className={`btn ${statusFilter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Hoàn thành
          </button>
          <button
            onClick={() => setStatusFilter("canceled")}
            className={`btn ${statusFilter === "canceled" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
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
                      <button   className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={() => handleCancelOrder(order._id)}>Hủy Đơn</button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
