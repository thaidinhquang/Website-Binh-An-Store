import React from "react";
import { Space, Steps, Descriptions, Input } from "antd";
import { CiUser } from "react-icons/ci";

import { useParams } from "react-router-dom";
import CustomerInfo from "./CustomerInfo";
import { useOrderDetail } from "../../../common/hooks/useOrderDetail";
import OrderStatus from "./OrderStatus";
import TableDataDetail from "./TableDataDetail";
import OrderProcessing from "./OrderProccessing";

const DetailOrder = () => {
  const { id } = useParams();
  const { data: order } = useOrderDetail(id);

  return (
    <div className="w-full">
      <div className="font-bold mb-4 text-lg"> Thông tin đơn hàng</div>

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