import { useParams } from "react-router-dom";
import { useTanstackMutation, useTanstackQuery } from "../../../common/hooks/useTanstackQuery";
import { useState, useEffect } from "react";
import socket from "/src/config/socket";

const CategorytEdit = () => {
  const { id } = useParams();
  const { data } = useTanstackQuery(`categories/${id}`);
  const { form, onSubmit, isPending } = useTanstackMutation(`categories`, "UPDATE", "/admin/category");
  const userEditingPost = { id: 1, post_id: id, fullname: "Nguyen Van A" };
  const handleUnload = () => {
    socket.emit('leaveEditPost', userEditingPost);
  };
  useEffect(() => {
    form.reset(data);
    window.addEventListener('unload', handleUnload);
    socket.emit('joinEditPost', userEditingPost);
    return () => {
      socket.emit('leaveEditPost', userEditingPost);
      window.removeEventListener('unload', handleUnload);
    };
  }
    , [data]);
  return (
    <>
      <div>Sửa Danh Mục</div>
      <div className="flex justify-end">
        <a href="admin/category">
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
                  Tên Danh Mục:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  {...form.register("name", { required: 'Category name is required', minLength: { value: 6, message: 'Category name must be at least 6 characters' } })}
                  type="text"
                />
                {form.formState.errors.name && <span>{form.formState.errors.name.message}</span>}
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Tên Danh Mục:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  {...form.register("slug", { required: 'Category slug is required', minLength: { value: 6, message: 'Category slug must be at least 6 characters' } })}
                  type="text"
                />
                {form.formState.errors.slug && <span>{form.formState.errors.slug.message}</span>}
              </div>
              <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
                {isPending ? "Đang Sửa..." : "Sửa"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategorytEdit;
