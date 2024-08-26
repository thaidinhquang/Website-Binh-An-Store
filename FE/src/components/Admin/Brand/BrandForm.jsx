import { Link, useParams } from "react-router-dom";
import { useTanstackMutation, useTanstackQuery } from "../../../common/hooks/useTanstackQuery";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Auth/core/Auth";
import socket from "/src/config/socket";
import { Form, Input, Button, Spin } from "antd"; // Nhập các thành phần từ Ant Design

const BrandForm = () => {
    const { id } = useParams();
    const [form] = Form.useForm(); // Khởi tạo form
    const { mutate } = useTanstackMutation({
        path: `brands`,
        action: id ? "UPDATE" : "CREATE",
        navigatePage: "/admin/brands",
    });
    const { currentUser } = useContext(AuthContext);
    const { data, isLoading } = id ? useTanstackQuery(`brands/${id}`) : { data: null };

    useEffect(() => {
        if (id) {
            const userEditingPost = { id: currentUser._id, post_id: id, fullname: currentUser.email };
            const handleUnload = () => {
                socket.emit('leaveEditPost', userEditingPost);
            };
            if (data) {
                form.setFieldsValue(data); // Đảm bảo rằng form được thiết lập với dữ liệu nhãn hàng
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
                <h2 className="text-lg font-bold mb-4">{id ? "Sửa thông tin nhãn hàng" : "Thêm nhãn hàng mới"}</h2>
                <div className="flex justify-end mb-4">
                    <Link to="/admin/brands">
                        <Button type="default">Quay lại</Button>
                    </Link>
                </div>

                <Form form={form} onFinish={onSubmit} layout="vertical">
                    <Form.Item
                        label="Tên nhãn hàng"
                        name="name"
                        rules={[{ required: true, message: 'Không được bỏ trống' }, { min: 2, message: 'Tên nhãn hàng phải có ít nhất 2 ký tự' }]}
                    >
                        <Input placeholder="Nhập tên nhãn hàng" />
                    </Form.Item>

                    <Form.Item
                        label="Slug"
                        name="slug"
                        rules={[{ required: true, message: 'Không được bỏ trống' }, { min: 2, message: 'Tên slug nhãn hàng phải có ít nhất 2 ký tự' }]}
                    >
                        <Input placeholder="Nhập slug nhãn hàng" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="my-8 px-4 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out">
                            {id ? "Sửa" : "Thêm"}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default BrandForm;