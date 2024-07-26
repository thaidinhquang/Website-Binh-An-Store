import { Link, useParams } from "react-router-dom";
import { useTanstackMutation, useTanstackQuery } from "../../../common/hooks/useTanstackQuery";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Auth/core/Auth";
import socket from "/src/config/socket";

const BrandForm = () => {
    const { id } = useParams();
    const { form, onSubmit } = useTanstackMutation({
        path: `brands`,
        action: id ? "UPDATE" : "CREATE",
        navigatePage: "/admin/brands",
    });
    const { currentUser } = useContext(AuthContext);
    const { data, isLoading } = id? useTanstackQuery(`brands/${id}`) : { data: null };
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
            <div>{id ? <div className="text-lg font-bold mb-4">Sửa thông tin danh mục</div> : <div className="text-lg font-bold mb-4">Thêm nhãn hàng mới</div>}</div>
            <div className="flex justify-end">
                <Link to="/admin/brands">
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
                                    Tên nhãn hàng
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    {...form.register("name", { required: 'Không được bỏ trống', minLength: { value: 2, message: 'Tên nhãn hàng phải có ít nhất 1 ký tự!' } })}
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
                                    {...form.register("slug", { required: 'không được bỏ trống', minLength: { value: 2, message: 'Tên slug nhãn hàng phải có ít nhất 1 ký tự!' } })}
                                    type="text"
                                />
                                {form.formState.errors.slug && <span className="text-red-500">{form.formState.errors.slug.message}</span>}
                            </div>
                            <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
                                {id ? "Sửa" : "Thêm"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BrandForm;