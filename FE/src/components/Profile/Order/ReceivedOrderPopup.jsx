import { Button, Popconfirm } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFinishOrder } from "../../../common/hooks/useFinishOrder";

const ReceivedOrderPopup = ({ orderId }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const receivedOrder = useFinishOrder(orderId);
  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = () => {
    receivedOrder.mutate(orderId, {
      onSuccess: () => {
        toast.success("Đã nhận hàng thành công");
        navigate(`/profile/orders`);
        setOpen(false);
      },
      onError: () => {
        setOpen(false);
      },
    });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Popconfirm
      title="Xác nhận đã nhận được hàng?"
      okText="Yes"
      okType="danger"
      open={open}
      onConfirm={handleOk}
      onCancel={handleCancel}
    >
      <Button type="primary" danger onClick={showPopconfirm}>
        Đã nhận hàng
      </Button>
    </Popconfirm>
  );
};

export default ReceivedOrderPopup;
