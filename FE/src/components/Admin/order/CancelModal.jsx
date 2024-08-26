import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCancelOrder } from "../../../common/hooks/useCancelOrder";

const CancelModal = ({ order }) => {
  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);

  const cancelOrder = useCancelOrder();

  const handleCancel = (values) => {
    if (!values.content) {
      return toast.error("Yêu cầu viết lí do!");
    }

    cancelOrder.mutate(
      {
        orderId: order.key,
        description: values.content,
      },
      {
        onSuccess: () => {
          setOpen(false);
          toast.success("Hủy đơn hàng thành công");
        },
        onError: () => {
          toast.error("Hủy đơn hàng thất bại");
        },
      }
    );
  };

  return (
    <>
      <Button type="default" onClick={() => setOpen(true)}>
        Hủy đơn
      </Button>

      <Modal
        maskClosable={false}
        open={open}
        title="Hủy đơn hàng"
        cancelText="Hủy bỏ"
        okButtonProps={{ autoFocus: true, htmlType: "submit" }}
        okType="default"
        onCancel={() => setOpen(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            initialValues={{ modifier: "public" }}
            clearOnDestroy
            onFinish={(values) => handleCancel(values)}
          >
            {dom}
          </Form>
        )}
      >
        <p className="font-semibold">Bạn có chắc hủy đơn hàng này không?</p>
        <Form.Item
          name="content"
          className="mt-2"
          rules={[{ required: true, message: "Làm ơn nêu lí do" }]}
        >
          <Input.TextArea placeholder="Viết lí do....." />
        </Form.Item>
      </Modal>
    </>
  );
};

export default CancelModal;
