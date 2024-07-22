import React from "react";
import { Table } from "antd";

const TableDataDetail = ({ order }) => {
  const dataSource =
    order?.items && order?.items?.length
      ? order?.items?.map((item) => ({
          key: item._id,
          name: item.name,
          image: <img src={item.image} alt={item.name} className="w-16 h-16" />,
          quantity: item.quantity,
          price: item.price,
          subTotal: item.quantity * item.price,
        }))
      : [];

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Tổng tiền",
      dataIndex: "subTotal",
      key: "subTotal",
    },
  ];
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      className="mt-8"
      pagination={false}
    />
  );
};

export default TableDataDetail;
