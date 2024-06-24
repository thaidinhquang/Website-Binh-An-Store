import { useParams } from "react-router-dom";
import { useTanstackMutation, useTanstackQuery } from "../../../common/hooks/useTanstackQuery";
import { useContext, useEffect } from "react";
import socket from "/src/config/socket";
import { AuthContext } from "../../Auth/core/Auth";

const ProductForm = () => {
    const { id } = useParams();
    const { form, onSubmit, isPending } = useTanstackMutation(`products`, id ? "UPDATE" : "CREATE", "/admin/product");
    const { currentUser } = useContext(AuthContext);
    const { data } = id ? useTanstackQuery(`products/${id}`) : { data: null };
    const { data: category } = useTanstackQuery(`categories`);
    if (id) {
        const userEditingPost = { id: currentUser._id, post_id: id, fullname: currentUser.email };
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
        <>
            <div>Sửa Sản Phẩm</div>
            <div className="flex justify-end">
                <a href="admin/product">
                    <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Quay lại
                    </button>
                </a>
            </div>


            <div>
                <div>
                    <div>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Tên Sản Phẩm
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    {...form.register("name", { required: true, minLength: 3 })}
                                    type="text"
                                />
                                {form.formState.errors.name && <span>{form.formState.errors.name.message}</span>}
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Giá Sản Phẩm
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    {...form.register("price", { required: true })}
                                    type="number"
                                />
                                {form.formState.errors?.price && <span>{form.formState.errors?.price?.message}</span>}
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
                                {form.formState.errors?.image && <span>{form.formState.errors?.image?.message}</span>}
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Slug
                                </label>
                                <input
                                    className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    {...form.register("slug", { required: 'Slug không được để trống' })}
                                />
                                {form.formState.errors.slug && <span>{form.formState.errors.slug.message}</span>}
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Category
                                </label>
                                <select
                                    className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    {...form.register("category", { required: 'Category không được để trống' })}
                                >
                                    {category?.map((cate) => (
                                        <option key={cate._id} value={cate._id}>
                                            {cate.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Mô tả Sản Phẩm
                                </label>
                                <textarea
                                    cols="30"
                                    rows="10"
                                    className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    {...form.register("description")}
                                ></textarea>
                            </div>
                            <button type="submit" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
                                {isPending ? id ? "Đang Sửa..." : "Đang Thêm..." : id ? "Sửa" : "Thêm"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductForm;