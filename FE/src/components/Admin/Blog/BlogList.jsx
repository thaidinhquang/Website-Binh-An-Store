import React from "react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import instance from "../../../config/axios";
import { Space, Table, Button, Popconfirm } from "antd";
import { toast } from "react-toastify";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CommonUtils from "../../../common/CommonUtils/CommonUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";

const BlogList = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["BLOGS"],
    queryFn: async () => {
      const { data } = await instance.get(`/blogs`);
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => instance.delete(`/blogs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["BLOGS"]);
      toast.success("Blog đã được xóa thành công!");
    },
    onError: (error) => {
      toast.error("Không thể xóa blog: " + error.message);
    },
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const exportToExcel = async () => {
    const dataToExport = data?.map((blog) => ({
      ID: blog._id,
      Title: blog.title,
      Slug: blog.slug,
      Image: blog.image,
      Content: blog.content,
      Active: blog.active ? "Active" : "Inactive",
      CreatedAt: new Date(blog.createdAt).toLocaleString(), // Format creation date and time
      UpdatedAt: new Date(blog.updatedAt).toLocaleString(), // Format update date and time
    }));
    await CommonUtils.exportExcel(dataToExport, "Blogs", "BlogList");
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Mã",
      dataIndex: "_id",
      key: "_id",
      ellipsis: true,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image, record) => (
        <img
          src={image}
          alt={record.title}
          className="w-10 h-10 object-cover rounded"
        />
      ),
    },
    {
      title: "Tên Blog",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/admin/blogs/edit/${record._id}`}>
            <Button icon={<EditOutlined />} />
          </Link>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa blog này?"
            onConfirm={() => handleDelete(record._id)}
            okText="Có"
            cancelText="Không"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (error) return <div className="p-4">Error: {error.message}</div>;
  return (
    <div>
      <h2 className="ant-space css-dev-only-do-not-override-1uq9j6g ant-space-horizontal ant-space-align-center ant-space-gap-row-small ant-space-gap-col-small font-semibold text-lg rounded-md bg-[#E9E9E9] w-full p-4 my-8">
        Danh sách blog
      </h2>
      <div className="">
        <div className="flex justify-between items-center mb-4">
          <Link
            to="/admin/blogs/add"
            className="px-4 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Thêm Blog
          </Link>
          <Button
            onClick={exportToExcel}
            type="default"
            icon={<FontAwesomeIcon icon={faFileExcel} />}
          >
            Xuất Excel
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="_id"
          loading={isLoading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

export default BlogList;
