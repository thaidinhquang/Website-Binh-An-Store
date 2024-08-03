import { Button, Space } from "antd";
import instance from "../../../config/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { ORDER_STATUS } from "../../../constants/order";
import { useCancelOrder } from "../../../common/hooks/useCancelOrder";

const OrderDetail = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data: order } = useQuery({
    queryKey: ["ORDER_DETAILS", id],
    queryFn: async () => {
      const { data } = await instance.get(`orders/${id}`);
      return data.metadata;
    },
  });

  const { mutate: cancelOrder  } = useCancelOrder();

  const handleCancelOrder = () => {
    cancelOrder(order?._id, {
      onSuccess: () => {
        // Refetch order details to reflect cancellation
        
        queryClient.invalidateQueries({
            queryKey: ["ORDER_DETAILS"],
          });
      },
    });
  };
  const { data: products } = useQuery({
    queryKey: ["PRODUCT", order?.items[0]?.name],
    queryFn: async () => {
      if (!order?.items[0]?.name) return null;
      try {
        const { data } = await instance.get(`/products/${order.items[0].name}`);

        return data || null;
      } catch (error) {
        console.error("Error fetching product details:", error);
        return null;
      }
    },
    enabled: !!order?.items[0]?.name, // Only run query if order item name exists
  });
  return (
    <div className=" mx-auto p-4 bg-white shadow-md rounded-lg">
      <Space className="font-semibold text-lg rounded-md bg-[#E9E9E9] w-full p-4">
        Chi tiết đơn hàng
      </Space>

      <div className="mb-4 my-3">
        <h2 className="text-xl font-semibold">Mã đơn hàng: {order?._id}</h2>
        <p className="text-gray-600">
          Thời gian: {new Date(order?.createdAt).toLocaleDateString()}
        </p>
        <p className="text-gray-600">
          Status:{" "}
          {(() => {
            switch (order?.orderStatus) {
              case "delivered":
                return (
                  <span className="text-blue-500 font-semibold uppercase">
                    {order.orderStatus}
                  </span>
                );
              case "done":
                return (
                  <span className="text-green-500 font-semibold uppercase">
                    {order.orderStatus}
                  </span>
                );
              case "cancelled":
                return (
                  <span className="text-red-500 font-semibold uppercase">
                    {order.orderStatus}
                  </span>
                );
              default:
                return (
                  <span className="text-yellow-500 font-semibold uppercase">
                    {order?.orderStatus}
                  </span>
                );
            }
          })()}
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          Người nhận: {order?.customerInfo.name}
        </h2>
        <p className="text-gray-600">Email: {order?.customerInfo.email}</p>
        <p className="text-gray-600">
          Số điện thoại: {order?.customerInfo.phone}
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Địa chỉ nhận hàng</h2>
        <p className="text-gray-600">{order?.shippingAddress?.city}</p>
        <p className="text-gray-600">
          {order?.shippingAddress?.city}, {order?.shippingAddress?.state}
        </p>
        <p className="text-gray-600">{order?.shippingAddress?.country}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Sản phẩm</h2>
        <div className="space-y-4">
          {order?.items?.map((product, index) => (
            <div
              key={product._id || index}
              className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <p className="">{product?.name}</p>
                  <p className="font-semibold">{products?.data.name}</p>
                  <p className="text-gray-600">Số lượng: {product?.quantity}</p>
                  <p className="text-gray-600">Giá: {product?.price}đ</p>
                </div>
              </div>
              <p className="font-semibold">
                Total: {product?.price * product?.quantity}đ
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t pt-4">
        <h2 className="text-xl font-semibold">Tổng giá tiền</h2>
        <div className="flex justify-between">
          <p className="text-gray-600">Shipping:</p>
          <p>{order?.shippingFee} đ</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Total:</p>
          <p>{order?.totalPrice} đ</p>
        </div>
      </div>

      <div>
        <Link to="/profile/orders">
          <Button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Quay lại
          </Button>
        </Link>
          {" "}
         {order?.orderStatus === ORDER_STATUS.PENDING && (
        <Button
       onClick={handleCancelOrder}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 border border-red-500 hover:border-transparent rounded"
        >
          Hủy đơn hàng
        </Button>
      )}
      </div>
     
    </div>
  );
};

export default OrderDetail;
