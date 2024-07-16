
import { Button, Space } from "antd";
import { ORDER_STATUS, PAYMENT_METHOD } from "../../../constants/order.js";

const FilterStatus = ({ setOrderStatus, setPaymentMethod }) => {
  return (
    <Space className="flex w-full mt-5">
      <Button
        className="h-[3rem] font-semibold border "
        onClick={() => setOrderStatus("")}
      >
        Tất cả
      </Button>
      <Button
        className="h-[3rem] font-semibold border "
        onClick={() => setOrderStatus(ORDER_STATUS.PENDING)}
      >
        Chờ xác nhận
      </Button>

      <Button
        className="h-[3rem] font-semibold border "
        onClick={() => setOrderStatus(ORDER_STATUS.CONFIRMED)}
      >
        Chờ lấy hàng
      </Button>
      <Button
        className="h-[3rem] font-semibold border "
        onClick={() => setOrderStatus(ORDER_STATUS.SHIPPING)}
      >
        Đang giao
      </Button>
      <Button
        className="h-[3rem] font-semibold border "
        onClick={() => setOrderStatus(ORDER_STATUS.DELIVERED)}
      >
        Đã giao
      </Button>

      <Button
        className="h-[3rem] font-semibold border "
        onClick={() => setOrderStatus(ORDER_STATUS.CANCELLED)}
      >
        Đơn hủy
      </Button>

      <Button
        className="h-[3rem] font-semibold border "
        onClick={() => setPaymentMethod(PAYMENT_METHOD.CASH)}
      >
        Chưa thanh toán
      </Button>
      <Button
        className="h-[3rem] font-semibold border "
        onClick={() => setPaymentMethod(PAYMENT_METHOD.CARD)}
      >
        Đã thanh toán
      </Button>
    </Space>
  );
};

export default FilterStatus;