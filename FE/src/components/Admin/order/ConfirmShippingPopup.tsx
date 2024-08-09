import React, { useState } from "react";
import { Button, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
import { useShippingOrder } from "../../../common/hooks/useShippingOrder";
import { toast } from "react-toastify";

const ConfirmShippingPopup = ({ orderId }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const shippingOrder = useShippingOrder(orderId);

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = () => {
    shippingOrder.mutate(orderId, {
      onSuccess: () => {
        toast.success("This order is on delivery");
        navigate(0);
        setOpen(false);
      },
      onError: () => {
        setOpen(false);
      },
    });
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <Popconfirm
      title="Confirm to delivery?"
      okText="Yes"
      okType="danger"
      open={open}
      onConfirm={handleOk}
      onCancel={handleCancel}
    >
      <Button type="primary" danger onClick={showPopconfirm}>
        Bắt đầu giao hàng
      </Button>
    </Popconfirm>
  );
};

export default ConfirmShippingPopup;
