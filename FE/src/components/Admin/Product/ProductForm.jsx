import React from "react";
import { Button, Form, Input, Select, Space, Typography } from "antd";
import { useBrands } from "../../../common/hooks/brand/useBrands";
import { useCategories } from "../../../common/hooks/category/useCategories";

const ProductForm = () => {
  const [form] = Form.useForm();

  const { data: brands } = useBrands();
  const { data: categories } = useCategories();

  const brandOptions = brands?.map((brand) => ({
    label: brand.name,
    value: brand._id,
  }));

  const categoryOptions = categories?.map((category) => ({
    label: category.name,
    value: category._id,
  }));

  const onAddProduct = (values) => {
    console.log(values);
  };

  return (
    <Form form={form} layout="vertical" onFinish={onAddProduct}>
      <Space className="p-3 border rounded-lg w-full bg-[#ffff] mb-5 flex items-center justify-between">
        <Typography.Title level={4}>Thêm mới sản phẩm</Typography.Title>
        <Button
          type="dashed"
          htmlType="submit"
          className="font-semibold px-2 py-5"
        >
          Thêm mới
        </Button>
      </Space>
      <Space
        className="w-full bg-[#ffff] p-3 border rounded-lg"
        direction="vertical"
      >
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Slug"
          name="slug"
          rules={[{ required: true, message: "Vui lòng nhập slug" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô tả sản phẩm"
          rules={[{ required: true, message: "Vui lòng nhập mô tả sản phẩm" }]}
        >
          <Input.TextArea row={5} />
        </Form.Item>
        <Form.Item
          name="brand"
          label="Thương hiệu sản phẩm"
          rules={[
            { required: true, message: "Vui lòng nhập thương hiệu sản phẩm" },
          ]}
        >
          <Select options={brandOptions} />
        </Form.Item>
        <Form.Item
          name="category"
          label="Loại sản phẩm"
          rules={[{ required: true, message: "Vui lòng nhập loại sản phẩm" }]}
        >
          <Select options={categoryOptions} />
        </Form.Item>
      </Space>
    </Form>
  );
};

export default ProductForm;
