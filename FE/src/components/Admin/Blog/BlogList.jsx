import React from 'react';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import instance from '../../../config/axios';
import { Space, Table, Button, Popconfirm } from 'antd';
import { toast } from 'react-toastify';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

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

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Mã',
      dataIndex: '_id',
      key: '_id',
      ellipsis: true,
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (image, record) => (
        <img src={image} alt={record.title} className="w-10 h-10 object-cover rounded" />
      ),
    },
    {
      title: 'Tên Blog',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
    },
    {
      title: 'Action',
      key: 'action',
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
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Danh sách blog</h2>
        <Link to="/admin/blogs/add">
          <Button className="bg-blue-600" type="primary" icon={<PlusOutlined />}>
            Thêm Blog
          </Button>
        </Link>
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
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default BlogList;