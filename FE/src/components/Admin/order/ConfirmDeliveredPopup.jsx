import { Button, Popconfirm } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeliveredOrder } from "../../../common/hooks/useDeliveredOrder";
import { toast } from "react-toastify";

const ConfirmDeliveredPopup = ({ orderId }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const deliveredOrder = useDeliveredOrder(orderId);

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = () => {
    deliveredOrder.mutate(orderId, {
      onSuccess: () => {
        toast.success("Đã giao hàng thành công");
        navigate(0);
        setOpen(false);
      },
      onError: () => {
        setOpen(false);
      },
    });
  };

  const handleCancel = () => {
    console.log("Đã ấn vào nút hủy");
    setOpen(false);
  };

  return (
    <Popconfirm
      title="Xác nhận giao hàng thành công?"
      okText="Yes"
      okType="danger"
      open={open}
      onConfirm={handleOk}
      onCancel={handleCancel}
    >
      <Button type="primary" danger onClick={showPopconfirm}>
        Xác nhận đã giao hàng
      </Button>
    </Popconfirm>
  );
};

export default ConfirmDeliveredPopup;
