import { Link, useParams } from "react-router-dom";
import { useTanstackMutation, useTanstackQuery } from "../../../common/hooks/useTanstackQuery";
import { useContext, useEffect } from "react";
import socket from "/src/config/socket";
import { AuthContext } from "../../Auth/core/Auth";

const CategorytForm = () => {
    const { id } = useParams();
    const { form, onSubmit, isPending } = useTanstackMutation(`categories`, id ? "UPDATE" : "CREATE", "/admin/categories");
    const { currentUser } = useContext(AuthContext);
    const { data, isLoading } = id? useTanstackQuery(`categories/${id}`) : { data: null };
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
    if (isLoading) return <p>Loading...</p>
    return (
        <>
            <div>{id ? <div className="text-lg font-bold mb-4">Sửa thông tin danh mục</div> : <div className="text-lg font-bold mb-4">Thêm danh mục mới</div>}</div>
            <div className="flex justify-end">
                <Link to="admin/category">
                    <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Quay lại
                    </button>
                </Link>
            </div>

            <div>
                <div>
                    <div>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Tên Danh Mục:
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    {...form.register("name", { required: 'Category name is required', minLength: { value: 6, message: 'Category name must be at least 6 characters' } })}
                                    type="text"
                                />
                                {form.formState.errors.name && <span className="text-red-500">{form.formState.errors.name.message}</span>}
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Slug:
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    {...form.register("slug", { required: 'Category slug is required', minLength: { value: 6, message: 'Category slug must be at least 6 characters' } })}
                                    type="text"
                                />
                                {form.formState.errors.slug && <span className="text-red-500">{form.formState.errors.slug.message}</span>}
                            </div>
                            <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
                                {isPending ? id ? "Đang Sửa..." : "Đang Thêm..." : id ? "Sửa" : "Thêm"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategorytForm;