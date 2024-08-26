import { Button, Popconfirm } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useShippingOrder } from "../../../common/hooks/useShippingOrder";

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
        toast.success("Đơn hàng này đang được giao");
        navigate(0);
        setOpen(false);
      },
      onError: () => {
        setOpen(false);
      },
    });
  };

  const handleCancel = () => {
    console.log("Đã ấn vào nút hủy bỏ");
    setOpen(false);
  };

  return (
    <Popconfirm
      title="Xác nhận giao hàng?"
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
