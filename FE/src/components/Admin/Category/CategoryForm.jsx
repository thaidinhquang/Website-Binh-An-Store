import { Link, useParams } from "react-router-dom";
import { useTanstackMutation, useTanstackQuery } from "../../../common/hooks/useTanstackQuery";
import { useContext, useEffect, useState } from "react";
import socket from "/src/config/socket";
import { AuthContext } from "../../Auth/core/Auth";
import { Form, Input, Select, Button, Spin } from "antd"; // Nhập các thành phần từ Ant Design

const { Option } = Select;

const CategorytForm = () => {
    const { id } = useParams();
    const [form] = Form.useForm(); // Khởi tạo form
    const { mutate } = useTanstackMutation({
        path: `categories`,
        action: id ? "UPDATE" : "CREATE",
        navigatePage: "/admin/categories",
    });
    const { currentUser } = useContext(AuthContext);
    const [listDetailSelected, setListDetailSelected] = useState(['']);
    const { data, isLoading } = id ? useTanstackQuery(`categories/details/${id}`, {}, false) : { data: null };
    const { data: listDetail, isLoading: isLoadingListDetail } = useTanstackQuery(`/details`, {}, false);

    useEffect(() => {
        if (id) {
            const userEditingPost = { id: currentUser._id, post_id: id, fullname: currentUser.email };
            const handleUnload = () => {
                socket.emit('leaveEditPost', userEditingPost);
            };
            if (data) {
                form.setFieldsValue(data); // Đảm bảo rằng form được thiết lập với dữ liệu danh mục
                setListDetailSelected(data.details.map((detail) => detail._id));
            }
            window.addEventListener('unload', handleUnload);
            socket.emit('joinEditPost', userEditingPost);

            return () => {
                socket.emit('leaveEditPost', userEditingPost);
                window.removeEventListener('unload', handleUnload);
            };
        }
    }, [data, id, form, currentUser]);

    const handleSelectChange = (index, value) => {
        const newList = [...listDetailSelected];
        newList[index] = value;
        setListDetailSelected(newList);
    };

    const handleDelete = (index) => {
        const newList = listDetailSelected.filter((_, i) => i !== index);
        setListDetailSelected(newList);
    };

    const handleAddNew = () => {
        setListDetailSelected([...listDetailSelected, '']);
    };

    const onSubmit = (data) => {
        const filteredListDetailSelected = listDetailSelected.filter(detail => detail !== '');
        // Kiểm tra xem id có tồn tại không trước khi gửi
        if (id) {
            mutate({ ...data, details: filteredListDetailSelected, _id: id }); // Gửi id cùng với dữ liệu
        } else {
            mutate({ ...data, details: filteredListDetailSelected }); // Chỉ gửi dữ liệu cho tạo mới
        }
    };

    if (isLoading || isLoadingListDetail) return <Spin size="large" />;

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-bold mb-4">{id ? "Sửa thông tin danh mục" : "Thêm danh mục mới"}</h2>
                <div className="flex justify-end mb-4">
                    <Link to="/admin/categories">
                        <Button type="default">Quay lại</Button>
                    </Link>
                </div>

                <Form form={form} onFinish={onSubmit} layout="vertical">
                    <Form.Item
                        label="Tên Danh Mục"
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }, { min: 6, message: 'Tên danh mục phải có ít nhất 6 ký tự' }]}
                    >
                        <Input placeholder="Nhập tên danh mục" />
                    </Form.Item>

                    {listDetailSelected.map((selectedDetail, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <Form.Item style={{ flex: 1 }}>
                                <Select
                                    value={selectedDetail}
                                    onChange={(value) => handleSelectChange(index, value)}
                                    placeholder="Chọn chi tiết"
                                >
                                    <Option value="">Select detail</Option>
                                    {listDetail && listDetail
                                        .filter(detail => !listDetailSelected.includes(detail._id) || detail._id === selectedDetail)
                                        .map(detail => (
                                            <Option key={detail._id} value={detail._id}>{detail.key}</Option>
                                        ))}
                                </Select>
                            </Form.Item>
                            <Button type="link" onClick={() => handleDelete(index)}>Xóa</Button>
                        </div>
                    ))}
                    <Button type="dashed" onClick={handleAddNew} style={{ width: '100%' }}>
                        Thêm Chi Tiết Mới
                    </Button>
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

export default CategorytForm;