import { Space, Select } from "antd";
import { ORDER_STATUS, PAYMENT_METHOD } from "../../../constants/order.js";

const { Option } = Select;

const FilterStatus = ({ setOrderStatus, setPaymentMethod }) => {
  return (
    <Space className="flex w-full mt-5">
      <Select
        placeholder="Trạng thái đơn hàng"
        onChange={(value) => setOrderStatus(value)}
        className="h-[3rem] font-semibold"
        style={{ width: 200 }}
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
        placeholder="Phương thức thanh toán"
        onChange={(value) => setPaymentMethod(value)}
        className="h-[3rem] font-semibold"
        style={{ width: 200 }}
      >
        <Option value="">Tất cả</Option>
        <Option value={PAYMENT_METHOD.CASH}>Chưa thanh toán</Option>
        <Option value={PAYMENT_METHOD.CARD}>Đã thanh toán</Option>
      </Select>
    </Space>
  );
};

export default FilterStatus;
