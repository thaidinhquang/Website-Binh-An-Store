import React from "react";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const CategoryTable = ({ data, isUserEditing, mutate }) => {
  const colors = [
    "bg-red-200 text-red-800",
    "bg-green-200 text-green-800",
    "bg-blue-200 text-blue-800",
    "bg-yellow-200 text-yellow-800",
    "bg-purple-200 text-purple-800",
    "bg-pink-200 text-pink-800",
    "bg-indigo-200 text-indigo-800",
  ];

  const getColor = (index) => {
    return colors[index % colors.length];
  };


  const columns = [
    {
      title: "STT",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên Danh Mục",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <span>{text}</span>
          <div className="text-gray-500 text-sm">{record._id}</div>
          {isUserEditing(record._id)}
        </div>
      ),
    },
    {
      title: "Chi tiết",
      dataIndex: "details",
      key: "details",
      render: (details) => (
        <>
          {details.map((detail, index) => (
            <span
              key={index}
              className={`mr-1 py-1 px-2 rounded-lg ${getColor(index)}`}
            >
              {detail.key}
            </span>
          ))}
        </>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <div className="flex items-center text-sm">
          <Link to={`/admin/categories/edit/${record._id}`}>
            <Button icon={<EditOutlined />} />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      rowKey="_id"
      pagination={false}
    />
  );
};

export default CategoryTable;