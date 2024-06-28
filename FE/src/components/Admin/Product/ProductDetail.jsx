import { Link, useParams } from "react-router-dom";
import { useTanstackMutation, useTanstackQuery } from "../../../common/hooks/useTanstackQuery";
import { useContext, useEffect } from "react";
import socket from "/src/config/socket";
import { AuthContext } from "../../Auth/core/Auth";

const ProductDetail = () => {
    const { id } = useParams();
    const { form, onSubmit, isPending } = useTanstackMutation(`products`, id ? "UPDATE" : "CREATE", "/admin/products");
    const { currentUser } = useContext(AuthContext);
    const { data } = id ? useTanstackQuery(`products/${id}`) : { data: null };
    const { data: category } = useTanstackQuery(`categories`);

    if (id) {
        const userEditingPost = { id: currentUser?._id, post_id: id, fullname: currentUser?.email };
        const handleUnload = () => {
            socket.emit('leaveEditPost', userEditingPost);
        };
        useEffect(() => {
            if (data) {
                form.reset(data);
            }
            window.addEventListener('unload', handleUnload);
            socket.emit('joinEditPost', userEditingPost);

            return () => {
                socket.emit('leaveEditPost', userEditingPost);
                window.removeEventListener('unload', handleUnload);
            };
        }, [data]);
    }

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
                    <img src={data?.image} alt={data?.name} className="w-full h-auto object-cover rounded-lg mb-4" />
                    <Link to={`/admin/products/edit/${id}`} className="block text-center text-blue-500 mt-4 hover:underline">
                        Edit
                    </Link>
                </div>
                
                <div className="bg-white p-6 shadow rounded md:w-2/3">
                    <h2 className="text-2xl font-semibold mb-4">Thông Tin Sản Phẩm</h2>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Tên Sản Phẩm
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                {...form.register("name", { required: 'Product name is required', minLength: { value: 6, message: 'Product name must be at least 6 characters' } })}
                                type="text"
                            />
                            {form.formState.errors.name && <span className="text-red-500">{form.formState.errors.name.message}</span>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Giá Sản Phẩm
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                {...form.register("price", { required: 'Product price is required', min: { value: 0, message: 'Product price must be greater than 0' }, pattern: { value: /^[0-9]+$/, message: 'Product price must be a number)' } })}
                                type="number"
                            />
                            {form.formState.errors.price && <span className="text-red-500">{form.formState.errors.price.message}</span>}
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Ảnh Sản Phẩm
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                {...form.register("image")}
                                type="text"
                            />
                            {form.formState.errors.image && <span className="text-red-500">{form.formState.errors.image.message}</span>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Slug
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                {...form.register("slug", { required: 'Slug không được để trống' })}
                            />
                            {form.formState.errors.slug && <span className="text-red-500">{form.formState.errors.slug.message}</span>}
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Category
                            </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                                Mô tả Sản Phẩm
                            </label>
                            <textarea
                                cols="30"
                                rows="5"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                {...form.register("description")}
                            ></textarea>
                        </div>
                        
                        <button type="submit" className="w-full py-2 px-4 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-300">
                            {isPending ? (id ? "Đang Sửa..." : "Đang Thêm...") : (id ? "Sửa" : "Thêm")}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
