import { Space, Select } from "antd";
import { ORDER_STATUS, PAYMENT_METHOD } from "../../../constants/order.js";

const { Option } = Select;

const FilterStatus = ({ setOrderStatus, setPaymentMethod }) => {
  return (
    <Space direction="vertical" className="w-full mt-5">
      <Select
        className="w-full"
        placeholder="Chọn trạng thái đơn hàng"
        onChange={(value) => setOrderStatus(value)}
        allowClear
      >
        <Option value="">Tất cả</Option>
        <Option value={ORDER_STATUS.PENDING}>Chờ xác nhận</Option>
        <Option value={ORDER_STATUS.CONFIRMED}>Chờ lấy hàng</Option>
        <Option value={ORDER_STATUS.SHIPPING}>Đang giao</Option>
        <Option value={ORDER_STATUS.DELIVERED}>Đã giao</Option>
        <Option value={ORDER_STATUS.DONE}>Giao hàng thành công</Option>
        <Option value={ORDER_STATUS.CANCELLED}>Đơn hủy</Option>
      </Select>
      
      <Select
        className="w-full mt-3"
        placeholder="Chọn phương thức thanh toán"
        onChange={(value) => setPaymentMethod(value)}
        allowClear
      >
        <Option value={PAYMENT_METHOD.CASH}>Chưa thanh toán</Option>
        <Option value={PAYMENT_METHOD.CARD}>Đã thanh toán</Option>
      </Select>
    </Space>
  );
};

export default FilterStatus;