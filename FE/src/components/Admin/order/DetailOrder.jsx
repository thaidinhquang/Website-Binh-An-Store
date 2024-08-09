import { Input, Space } from "antd";
import { useParams } from "react-router-dom";
import { useOrderDetail } from "../../../common/hooks/useOrderDetail";
import CustomerInfo from "./CustomerInfo";
import OrderProcessing from "./OrderProccessing";
import OrderStatus from "./OrderStatus";
import TableDataDetail from "./TableDataDetail";
import ConfirmShippingPopup from "./ConfirmShippingPopup";
import ConfirmDeliveredPopup from "./ConfirmDeliveredPopup";

const DetailOrder = () => {
  const { id } = useParams();
  const { data: order } = useOrderDetail(id);

  console.log(order);

  return (
    <div className="w-full">
      <Space className="flex justify-between items-center bg-[#ffff] p-4 rounded-lg mb-5">
        <span className="font-bold mb-4 text-lg">Thông tin đơn hàng</span>

        {order?.orderStatus === "confirmed" && (
          <ConfirmShippingPopup orderId={id} />
        )}

        {order?.orderStatus === "shipping" && (
          <ConfirmDeliveredPopup orderId={id} />
        )}
      </Space>

      <OrderProcessing order={order} />

      <CustomerInfo order={order} />

      <OrderStatus order={order} />

      {order?.description && (
        <div className="flex flex-col w-full">
          <h2 className="font-semibold mt-4">Note</h2>
          <Input.TextArea
            className="w-full"
            value={order?.description}
            readOnly
          />
        </div>
      )}

      <TableDataDetail order={order} />
    </div>
  );
};

export default DetailOrder;
