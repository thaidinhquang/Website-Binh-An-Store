import { Link, useParams } from "react-router-dom";
import { useTanstackMutation, useTanstackQuery } from "../../../common/hooks/useTanstackQuery";
import { useContext, useEffect } from "react";
import socket from "/src/config/socket";
import { AuthContext } from "../../Auth/core/Auth";

const UserForm = () => {
  const { id } = useParams();
  const { form, onSubmit, isPending } = useTanstackMutation(`users`, id ? "UPDATE" : "CREATE", "/admin/users");
  const { currentUser } = useContext(AuthContext);
  const { data, isLoading } = id ? useTanstackQuery(`users/${id}`) : { data: null };
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
      <div>{id ? <div className="text-lg font-bold mb-4">Sửa thông tin người dùng</div> : <div className="text-lg font-bold mb-4">Thêm người dùng mới</div>}</div>
      <div className="flex justify-end mb-4">
        <Link to="/admin/users">
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Quay lại
          </button>
        </Link>
      </div>

      <div className="max-w-lg mx-auto">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tên
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...form.register("name", { required: 'Name is required', minLength: { value: 6, message: 'Name must be at least 6 characters' } })}
              type="text"
            />
            {form.formState.errors.name && <span className="text-red-500">{form.formState.errors.name.message}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...form.register("email", { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
              type="email"
            />
            {form.formState.errors.email && <span className="text-red-500">{form.formState.errors.email.message}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Số điện thoại
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...form.register("phone", { required: 'phone is required', pattern: { value: /^\d{10,11}$/, message: 'Invalid phone number' } })}
              type="text"
            />
            {form.formState.errors.phone && <span className="text-red-500">{form.formState.errors.phone.message}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Địa chỉ
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...form.register("address")}
              type="text"
            />
            {form.formState.errors.address && <span className="text-red-500">{form.formState.errors.address.message}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Vai trò
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...form.register("role", { required: 'Role is required' })}
              type="text"
            />
            {form.formState.errors.role && <span className="text-red-500">{form.formState.errors.role.message}</span>}
          </div>

          <button
            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:focus:ring-yellow-900"
            type="submit"
          >
            {isLoading ? "Đang Sửa..." : "Sửa"}
          </button>
        </form>
      </div>
    </>
  );
};

export default UserForm;
