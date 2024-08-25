import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useGetDetail } from "../../../common/hooks/detail/useGetDetail";
import { useUpdateDetail } from "../../../common/hooks/detail/useaUpdateDetail";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../../constants/queryKey";
import { toast } from "react-toastify";
import { useCreateDetail } from "../../../common/hooks/detail/useCreateDetail";

const CreateDetailModal = ({open, onclose}) => {
  const [form] = Form.useForm();
  const createDetail = useCreateDetail();
  const queryClient = useQueryClient();

  const onSave = (data) => {
    createDetail.mutate(
      {
        key: data.key,
        isSelectedInputType: true,
        values: data.values.map((value) => value.value),
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.DETAILS],
          });
          toast.success("Thêm thông số thành công");
        },
      }
    );
    onclose(false);
  };

  const handleClose = () => {
    form.resetFields();
    onclose(false);
  };

  return (
    <>
      <Modal
        forceRender={true}
        maskClosable={false}
        open={open}
        title="Tạo mới chi tiết thông số"
        okText="Lưu"
        okType="dashed"
        cancelText="Hủy"
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
        }}
        onCancel={handleClose}
        destroyOnClose
        width={600}
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            clearOnDestroy
            onFinish={(values) => onSave(values)}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item name="key" label="Thông số">
          <Input />
        </Form.Item>
        <Typography.Title level={5}>Danh sách giá trị</Typography.Title>
        <Form.List name="values">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} className="w-full flex justify-between">
                  <Form.Item
                    key={`${key}`}
                    {...restField}
                    name={[name, "value"]}
                    rules={[{ required: true, message: "Missing value" }]}
                    className="w-[30rem]"
                  >
                    <Input placeholder="value" />
                  </Form.Item>
                  <Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Form.Item>
                </Space>
              ))}

              <Form.Item className="w-[10rem] m-0">
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Thêm giá trị
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Modal>
    </>
  );
};

export default CreateDetailModal;