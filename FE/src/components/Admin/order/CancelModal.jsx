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
      return toast.error("Please input a reason!");
    }

    cancelOrder.mutate(
      {
        orderId: order.key,
        description: values.content,
      },
      {
        onSuccess: () => {
          setOpen(false);
          toast.success("Cancel order successfully");
        },
        onError: () => {
          toast.error("Cancel order failed");
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
        title="Cancel Order"
        cancelText="Cancel"
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
        <p className="font-semibold">Are you sure to cancel this order?</p>
        <Form.Item
          name="content"
          className="mt-2"
          rules={[{ required: true, message: "Please input a reason!" }]}
        >
          <Input.TextArea placeholder="Write a reason..." />
        </Form.Item>
      </Modal>
    </>
  );
};

export default CancelModal;
