
import { Descriptions } from "antd";
import moment from "moment";


const formatPrice = (price) => {
  if (price === undefined || price === null) return "0 VND";
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};

const OrderStatus = ({ order }) => {
  const items = [
    {
      key: "1",
      label: "Trạng thái thanh toán",
      children: <p>{order?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}</p>,
    },
    {
      key: "2",
      label: "Phương thức giao hàng",
      children: (
        <p>
          {order?.shippingMethod
            ? "Giao hàng hỏa tốc"
            : "Vận chuyển thông thường"}
        </p>
      ),
    },
    {
      key: "3",
      label: "Cước phí vận chuyển",
      children: <p>{formatPrice(order?.shippingFee)}</p>,
    },
    {
      key: "4",
      label: "VAT",
      children: <p>{order?.tax ? `${order?.tax} %` : "0%"}</p>,
    },
    {
      key: "5",
      label: "Tổng tiền thanh toán",
      children: <p>{formatPrice(order?.totalPrice)}</p>,
    },
    {
      key: "6",
      label: "Ngày đặt hàng",
      children: <p>{moment(order?.createdAt).format(" HH:mm:ss DD/MM/YYYY")}</p>,
    },
  ];

  return (
    <Descriptions
      title="Phí và dịch vụ"
      items={items}
      className="border rounded-lg p-4 mt-4"
    />
  );
};

export default OrderStatus;
