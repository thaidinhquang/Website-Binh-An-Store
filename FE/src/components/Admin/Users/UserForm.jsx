import { Link, useParams } from "react-router-dom";
import { useTanstackMutation, useTanstackQuery } from "../../../common/hooks/useTanstackQuery";
import { useContext, useEffect } from "react";
import socket from "/src/config/socket";
import { AuthContext } from "../../Auth/core/Auth";
import { Form, Input, Button, Spin } from "antd"; // Nhập các thành phần từ Ant Design

const UserForm = () => {
  const { id } = useParams();
  const [form] = Form.useForm(); // Khởi tạo form
  const { mutate } = useTanstackMutation({
    path: `users`,
    action: id ? "UPDATE" : "CREATE",
    navigatePage: "/admin/users",
  });
  const { currentUser } = useContext(AuthContext);
  const { data, isLoading } = id ? useTanstackQuery(`users/${id}`) : { data: null };

  useEffect(() => {
    if (id) {
      const userEditingPost = { id: currentUser._id, post_id: id, fullname: currentUser.email };
      const handleUnload = () => {
        socket.emit('leaveEditPost', userEditingPost);
      };
      if (data) {
        form.setFieldsValue(data); // Đảm bảo rằng form được thiết lập với dữ liệu người dùng
      }
      window.addEventListener('unload', handleUnload);
      socket.emit('joinEditPost', userEditingPost);

      return () => {
        socket.emit('leaveEditPost', userEditingPost);
        window.removeEventListener('unload', handleUnload);
      };
    }
  }, [data, id, form, currentUser]);

  if (isLoading) return <Spin size="large" />;

  const onSubmit = (data) => {
    if (id) {
      mutate({ ...data, _id: id }); // Gửi id cùng với dữ liệu
    } else {
      mutate(data); // Chỉ gửi dữ liệu cho tạo mới
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold mb-4">{id ? "Sửa thông tin người dùng" : "Thêm người dùng mới"}</h2>
        <div className="flex justify-end mb-4">
          <Link to="/admin/users">
            <Button type="default">Quay lại</Button>
          </Link>
        </div>

        <Form form={form} onFinish={onSubmit} layout="vertical">
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: 'Tên là bắt buộc' }, { min: 6, message: 'Tên phải có ít nhất 6 ký tự' }]}
          >
            <Input placeholder="Nhập tên" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Email là bắt buộc' }, { type: 'email', message: 'Email không hợp lệ' }]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: 'Số điện thoại là bắt buộc' }, { pattern: /^\d{10,11}$/, message: 'Số điện thoại không hợp lệ' }]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
          >
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>

          <Form.Item
            label="Vai trò"
            name="role"
            rules={[{ required: true, message: 'Vai trò là bắt buộc' }]}
          >
            <Input placeholder="Nhập vai trò" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="my-8 px-4 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out">
              {isLoading ? "Đang Sửa..." : "Sửa"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UserForm;