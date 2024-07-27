import { Link, useParams } from "react-router-dom";
import { useTanstackMutation, useTanstackQuery } from "../../../common/hooks/useTanstackQuery";
import { useContext, useEffect, useState } from "react";
import socket from "/src/config/socket";
import { AuthContext } from "../../Auth/core/Auth";
import instance from "../../../config/axios";
import { useQuery } from "@tanstack/react-query";

const ProductForm = () => {
    const { id } = useParams();
    const [selectedAttribute1, setSelectedAttribute1] = useState('');
    const [selectedAttribute2, setSelectedAttribute2] = useState('');

    const { form, onSubmit } = useTanstackMutation({
        path: `products`,
        action: id ? "UPDATE" : "CREATE",
        navigatePage: "/admin/products",
    });

    const { currentUser } = useContext(AuthContext);
    const { data } = id ? useTanstackQuery(`products/${id}`) : { data: null };
    const { data: category } = useTanstackQuery(`categories`,{
        active: true
    });
    
    const { data: attribute } = useQuery({
        queryKey: ["ATTRIBUTE"],
        queryFn: async () => {
            const { data } = await instance.get(`/attributes`);
            return data;
        },
    });

    const { data: brand } = useTanstackQuery(`brands`,{

        active: true
    });
    useEffect(() => {
        if (id) {
            const userEditingPost = { id: currentUser?._id, post_id: id, fullname: currentUser?.email };
            const handleUnload = () => {
                socket.emit('leaveEditPost', userEditingPost);
            };

            if (data) {
                form.reset(data);
                // Assuming attributes are stored as an array in the data object
                if (data.attributes?.length > 0) {
                    setSelectedAttribute1(data.attributes[0]);
                    setSelectedAttribute2(data.attributes[1] || '');
                }
            }

            window.addEventListener('beforeunload', handleUnload);
            socket.emit('joinEditPost', userEditingPost);

            return () => {
                socket.emit('leaveEditPost', userEditingPost);
                window.removeEventListener('beforeunload', handleUnload);
            };
        }
    }, [id, currentUser, data]);

    // Filter options
    const filteredOptions1 = attribute?.filter(att => att._id !== selectedAttribute2) || [];
    const filteredOptions2 = attribute?.filter(att => att._id !== selectedAttribute1) || [];

    return (
        <>
            <div>Sửa Sản Phẩm</div>
            <div className="flex justify-end">
                <Link to="/admin/products">
                    <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Quay lại
                    </button>
                </Link>
            </div>

            <div>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Tên Sản Phẩm
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            {...form.register("name", { required: 'Product name is required', minLength: { value: 6, message: 'Product name must be at least 6 characters' } })}
                            type="text"
                        />
                        {form.formState.errors.name && <span className="text-red-500">{form.formState.errors.name.message}</span>}
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Giá Cũ
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            {...form.register("priceOld", { required: 'Product price is required', min: { value: 0, message: 'Product price must be greater than 0' }, pattern: { value: /^[0-9]+$/, message: 'Product price must be a number' } })}
                            type="number"
                        />
                        {form.formState.errors.priceOld && <span className="text-red-500">{form.formState.errors.priceOld.message}</span>}
                    </div>

                    <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Giá Mới
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        {...form.register("price", { required: 'Product price is required', min: { value: 0, message: 'Product price must be greater than 0' }, pattern: { value: /^[0-9]+$/, message: 'Product price must be a number' } })}
                        type="number"
                    />
                    {form.formState.errors.price && <span className="text-red-500">{form.formState.errors.price.message}</span>}
                </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Số Lượng
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            {...form.register("countInStock", { required: 'Product count is required', min: { value: 0, message: 'Product count must be greater than 0' }, pattern: { value: /^[0-9]+$/, message: 'Product count must be a number' } })}
                            type="number"
                        />
                        {form.formState.errors.countInStock && <span className="text-red-500">{form.formState.errors.countInStock.message}</span>}
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Ảnh Sản Phẩm
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            {...form.register("image")}
                            type="text"
                        />
                        {form.formState.errors.image && <span className="text-red-500">{form.formState.errors.image.message}</span>}
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Slug
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            {...form.register("slug", { required: 'Slug không được để trống' })}
                        />
                        {form.formState.errors.slug && <span className="text-red-500">{form.formState.errors.slug.message}</span>}
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Category
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            {...form.register("category", { required: 'Category không được để trống' })}
                        >
                            {category?.docs?.length > 0 ? category.docs.map((cate) => (
                                <option key={cate._id} value={cate._id}>
                                    {cate.name}
                                </option>
                            )) : <option value="">Không có danh mục</option>}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Thuộc tính 1
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            {...form.register("attributes[0]", { required: 'Attribute 1 không được để trống' })}
                            value={selectedAttribute1}
                            onChange={(e) => {
                                setSelectedAttribute1(e.target.value);
                                form.setValue("attributes[0]", e.target.value);
                            }}
                        >
                        <option >Chọn thuộc tính</option>
                            {filteredOptions1.length > 0 ? filteredOptions1.map((att) => (
                                <option key={att._id} value={att._id}>
                                    {att.name}
                                </option>
                            )) : <option value="">Không có thuộc tính</option>}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Thuộc tính 2
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            {...form.register("attributes[1]", { required: 'Attribute 2 không được để trống' })}
                            value={selectedAttribute2}
                            onChange={(e) => {
                                setSelectedAttribute2(e.target.value);
                                form.setValue("attributes[1]", e.target.value);
                            }}
                        >
                       
                            {filteredOptions2.length > 0 ? filteredOptions2.map((att) => (
                                <option key={att._id} value={att._id}>
                                    {att.name}
                                </option>
                            )) : <option value="">Không có thuộc tính</option>}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Nhãn hàng
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            {...form.register("brand", { required: 'Nhãn hàng không được để trống' })}
                        >
                        
                            {brand?.docs.length > 0 ? brand?.docs.map((brand) => (
                                <option key={brand._id} value={brand._id}>
                                    {brand.name}
                                </option>
                            )) : <option value="">Không có nhãn hàng</option>}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Mô tả Sản Phẩm
                        </label>
                        <textarea
                            cols="30"
                            rows="5"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            {...form.register("description")}
                        ></textarea>
                    </div>

                    <button type="submit" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
                        {id ? "Sửa" : "Thêm"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default ProductForm;