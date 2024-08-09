import { Descriptions } from "antd";

const CustomerInfo = ({ order }) => {
  const items = [
    {
      key: "1",
      label: "Tên khách hàng",
      children: <p>{order?.customerInfo?.name}</p>,
    },
    {
      key: "2",
      label: "Số điện thoại",
      children: <p>{order?.customerInfo?.phone}</p>,
    },
    {
      key: "3",
      label: "Email ",
      children: <p>{order?.customerInfo?.email}</p>,
    },
    {
      key: "4",
      label: "Địa chỉ 1",
      children: (
        <p>{`${order?.shippingAddress?.line1}, ${order?.shippingAddress?.state}, ${order?.shippingAddress?.city}, ${order?.shippingAddress?.country}`}</p>
      ),
    },
    {
      key: "5",
      label: "Địa chỉ 2",
      children: (
        <p>{`${order?.shippingAddress?.line2}, ${order?.shippingAddress?.state}, ${order?.shippingAddress?.city}, ${order?.shippingAddress?.country}`}</p>
      ),
    },
    {
      key: "6",
      label: "Mã bưu điện",
      children: <p>{order?.shippingAddress?.postal_code}</p>,
    },
  ];

  return (
    <Descriptions
      title="Thông tin người nhận"
      items={items}
      className="border rounded-lg p-4 mt-4"
    />
  );
};

export default CustomerInfo;
