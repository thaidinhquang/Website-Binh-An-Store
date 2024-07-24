import { Link, useLocation, useParams } from "react-router-dom";
import { useTanstackMutation, useTanstackQuery } from "../../../common/hooks/useTanstackQuery";
import { useContext, useEffect, useState } from "react";
import socket from "/src/config/socket";
import { AuthContext } from "../../Auth/core/Auth";
import instance from "../../../config/axios";
import { useQuery } from "@tanstack/react-query";

const ProductForm = () => {
    const location = useLocation().pathname.split('/')[3];
    const { id } = useParams();
    const [image, setImage] = useState('https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg');
    const [selectedAttribute1, setSelectedAttribute1] = useState('');
    const [selectedAttribute2, setSelectedAttribute2] = useState('');

    const { form, onSubmit } = useTanstackMutation({
        path: `products`,
        action: id ? "UPDATE" : "CREATE",
        navigatePage: "/admin/products",
    });
    const { currentUser } = useContext(AuthContext);
    const { data } = id ? useTanstackQuery(`products/not-populate/${id}`) : { data: null };
    const { data: category } = useTanstackQuery(`categories`,{

        active: true
    });
    const { data: attribute } = useQuery({
        queryKey: ["ATTRIBUTE"],
        queryFn: async () => {
            const { data } = await instance.get(`/attributes`,  { active: true } );
            return data;
        },
    });

    const { data: brand } = useTanstackQuery(`brands`,{

        active: true
    });

    const { mutate, isPending } = useTanstackMutation({
        action: "UPLOAD",
        toastMessage: "Uploading image",
        invalidateQueries: false
    });

    useEffect(() => {
        if (data) {
            form.reset(data);
            setImage(data.image);
            setSelectedAttribute1(data.attributes?.[0] || '');
            setSelectedAttribute2(data.attributes?.[1] || '');
        }
    }, [data]);

    useEffect(() => {
        if (location === 'edit') {
            const userEditingPost = { id: currentUser?._id, post_id: id, fullname: currentUser?.email };
            const handleUnload = () => {
                socket.emit('leaveEditPost', userEditingPost);
            };
            window.addEventListener('beforeunload', handleUnload);
            socket.emit('joinEditPost', userEditingPost);
            return () => {
                socket.emit('leaveEditPost', userEditingPost);
                window.removeEventListener('beforeunload', handleUnload);
            };
        }
    }, [location, currentUser, id]);

    // Filter options
    const filteredOptions1 = attribute?.filter(att => att._id !== selectedAttribute2) || [];
    const filteredOptions2 = attribute?.filter(att => att._id !== selectedAttribute1) || [];

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Chi Tiết Sản Phẩm</h1>
                <Link to="/admin/products">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                        Quay lại
                    </button>
                </Link>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="bg-white p-6 shadow rounded md:w-1/3">
                    <h2 className="text-2xl font-semibold mb-4">Ảnh Sản Phẩm</h2>
                    <img src={image} className="w-full h-auto object-cover rounded-lg mb-4" />
                    {location === 'detail' ? (
                        <Link to={`/admin/products/edit/${id}`} className="block text-center text-blue-500 mt-4 hover:underline">
                            Edit
                        </Link>
                    ) : (
                        <div className="flex flex-col">
                            <button type="button"
                                onClick={() => document.getElementById('file')?.click()}
                                className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                                Change image
                            </button>
                            <input type="file" id="file" accept="image/jpg, image/jpeg, image/png" onChange={async ({ target }) => {
                                if (target.files.length > 0) {
                                    const file = target.files[0];
                                    setImage(URL.createObjectURL(file));
                                    mutate(file, {
                                        onSuccess: (data) => {
                                            form.setValue('image', data);
                                        }
                                    });
                                }
                            }} className="hidden" />
                        </div>
                    )}
                </div>

                <div className="bg-white p-6 shadow rounded md:w-2/3">
                    <h2 className="text-2xl font-semibold mb-4">Thông Tin Sản Phẩm</h2>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Tên Sản Phẩm
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:cursor-not-allowed"
                                {...form.register("name", { required: 'Product name is required', minLength: { value: 6, message: 'Product name must be at least 6 characters' } })}
                                disabled={location === 'detail'}
                                type="text"
                            />
                            {form.formState.errors.name && <span className="text-red-500">{form.formState.errors.name.message}</span>}
                        </div>
                        <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Giá Cũ
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:cursor-not-allowed"
                            {...form.register("priceOld", { required: 'Product price is required', min: { value: 0, message: 'Product price must be greater than 0' }, pattern: { value: /^[0-9]+$/, message: 'Product price must be a number' } })}
                            disabled={location === 'detail'}
                            type="number"
                        />
                        {form.formState.errors.priceOld && <span className="text-red-500">{form.formState.errors.priceOld.message}</span>}
                    </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Giá Mới
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:cursor-not-allowed"
                                {...form.register("price", { required: 'Product price is required', min: { value: 0, message: 'Product price must be greater than 0' }, pattern: { value: /^[0-9]+$/, message: 'Product price must be a number' } })}
                                disabled={location === 'detail'}
                                type="number"
                            />
                            {form.formState.errors.price && <span className="text-red-500">{form.formState.errors.price.message}</span>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Slug
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:cursor-not-allowed"
                                {...form.register("slug", { required: 'Slug không được để trống' })}
                                disabled={location === 'detail'}
                            />
                            {form.formState.errors.slug && <span className="text-red-500">{form.formState.errors.slug.message}</span>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Số lượng
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:cursor-not-allowed"
                                {...form.register("countInStock", { required: 'Số lượng không được để trống' })}
                                disabled={location === 'detail'}
                            />
                            {form.formState.errors.countInStock && <span className="text-red-500">{form.formState.errors.countInStock.message}</span>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Category
                            </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:cursor-not-allowed"
                                {...form.register("category", { required: 'Category không được để trống' })}
                                disabled={location === 'detail'}
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
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:cursor-not-allowed"
                                {...form.register("attributes[0]", { required: 'Attribute 1 không được để trống' })}
                                value={selectedAttribute1}
                                onChange={(e) => {
                                    setSelectedAttribute1(e.target.value);
                                    form.setValue("attributes[0]", e.target.value);
                                }}
                                disabled={location === 'detail'}
                            >
                       
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
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:cursor-not-allowed"
                                {...form.register("attributes[1]", { required: 'Attribute 2 không được để trống' })}
                                value={selectedAttribute2}
                                onChange={(e) => {
                                    setSelectedAttribute2(e.target.value);
                                    form.setValue("attributes[1]", e.target.value);
                                }}
                                disabled={location === 'detail'}
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
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:cursor-not-allowed"
                                {...form.register("brand", { required: 'Nhãn hàng không được để trống' })}
                                disabled={location === 'detail'}
                            >
                            
                                {brand?.docs.length > 0 ? brand.docs.map((brand) => (
                                    <option key={brand._id} value={brand._id}>
                                        {brand.name}
                                    </option>
                                )) : <option value="">Không có nhãn hàng</option>}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Mô tả Sản Phẩm
                            </label>
                            <textarea
                                cols="30"
                                rows="5"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:cursor-not-allowed"
                                {...form.register("description")}
                                disabled={location === 'detail'}
                            ></textarea>
                        </div>

                        <button disabled={isPending} hidden={location === 'detail'} type="submit" className="w-full py-2 px-4 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-300 disabled:bg-blue-500">
                            {id ? "Sửa" : "Thêm"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;