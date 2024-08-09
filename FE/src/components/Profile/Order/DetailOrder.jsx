import { Input, Space } from "antd";
import { useParams } from "react-router-dom";

import TableDataDetail from "./TableDataDetail";
import OrderProcessing from "./OrderProccessing";
import { useOrderDetail } from "../../../common/hooks/useOrderDetail";

import CustomerInfo from "../../Admin/order/CustomerInfo";
import OrderStatus from "../../Admin/order/OrderStatus";

const DetailOrderUser = () => {
  const { id } = useParams();
  const { data: order } = useOrderDetail(id);

  return (
    <div className="w-full">
      <Space className="flex justify-between items-center bg-[#ffff] p-4 rounded-lg mb-5">
        <span className="font-bold mb-4 text-lg">Thông tin đơn hàng</span>
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

export default DetailOrderUser;
