import { useTanstackMutation, useTanstackQuery } from "../../../common/hooks/useTanstackQuery";
import { useEffect, useState } from 'react';
import socket from "/src/config/socket";
import { Link, useLocation } from "react-router-dom";
import Pageination from "../../UI/Pagination";
import { useForm } from "react-hook-form";
import { useHookSearch } from "../../../common/hooks/useSearch";

const UserList = () => {
  const search = new URLSearchParams(useLocation().search);
  const page = search.get('page') || 1;
  const sort = search.get('sort') || '';
  const name = search.get('name') || '';
  const email = search.get('email') || '';
  const phone = search.get('phone') || '';
  const role = search.get('role') || '';
  const active = search.get('active') || '';
  const form = useForm();
  const useSearch = useHookSearch();
  const { data: dataRole, isLoading: isLoadingRole } = useTanstackQuery('role')
  const { data, isLoading, refetch } = useTanstackQuery('users', { active, page, sort, name, email, phone, role })
  const { mutate, isPending } = useTanstackMutation(`users`, "DELETE");
  const [listUserOnEditRoute, setListUserOnEditRoute] = useState(null);
  const isUserEditing = (id) => {
    const user = listUserOnEditRoute ? listUserOnEditRoute[id] : null;
    return user ? <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-full ml-2">{user} đang chỉnh sửa</span> : '';
  };
  useEffect(() => {
    form.reset({ active, page, sort, name, email, phone, role });
    const handleUserEditing = (data) => {
      setListUserOnEditRoute(data);
    };
    socket.on('userEditing', handleUserEditing);
    socket.emit('getUsersEditing');
  }, []);
  useEffect(() => {
    refetch()
  }, [active, page, sort, name, email, phone, role]);

  const searchForm = (data) => {
    useSearch(data, '/admin/users')
  }
  if (isLoading || isLoadingRole) return <p>Loading...</p>
  return (
    <>
      <div>Danh sách nguời dùng</div>
      <div className="my-8 flex justify-between">
        <Link to={`/admin/users/add`}
          className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          thêm người dùng
        </Link>
      </div>
      <form onSubmit={form.handleSubmit(searchForm)} className="flex justify-between gap-3">
        <input
          {...form.register('name')}
          type="text" placeholder="Tìm kiếm theo tên" className="border border-gray-300 dark:border-gray-700 p-2 h-[50px] w-full outline-none focus:border-pink-500" />
        <input
          {...form.register('email')}
          type="text" placeholder="Tìm kiếm theo email" className="border border-gray-300 dark:border-gray-700 p-2 h-[50px] w-full outline-none focus:border-pink-500" />
        <input
          {...form.register('phone')}
          type="text" placeholder="Tìm kiếm theo sdt" className="border border-gray-300 dark:border-gray-700 p-2 h-[50px] w-full outline-none focus:border-pink-500" />
        <select
          {...form.register('role')}
          className="border border-gray-300 dark:border-gray-700 p-2 h-[50px] w-[200px]">
          <option value="">Tất cả</option>
          {dataRole?.map((item) => (
            <option key={item._id} value={item.name}>{item.name}</option>
          ))}
        </select>
        <select
          {...form.register('sort')}
          className="border border-gray-300 dark:border-gray-700 p-2 h-[50px] w-[200px]">
          <option value="">Mới {'->'} cũ</option>
          <option value="createdAt:1">Cũ {'->'} mới</option>
        </select>
        <select
          {...form.register('active')}
          className="border border-gray-300 dark:border-gray-700 p-2 h-[50px] w-[200px]">
          <option value="">Tất cả</option>
          <option value={true}>Đang hoạt động</option>
          <option value={false}>Không hoạt động</option>
        </select>
        <button type="submit" className="text-white  bg-blue-700 hover:bg-blue-800 font-medium text-sm px-5 py-2.5 me-2 mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 h-[50px] w-[400px]">
          Tìm kiếm
        </button>
      </form>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <td scope="col" className="px-6 py-3"></td>
              <td scope="col" className="px-6 py-3">
                Tên
              </td>
              <td scope="col" className="px-6 py-3">
                Email
              </td>
              <td scope="col" className="px-6 py-3">
                Địa chỉ
              </td>
              <td scope="col" className="px-6 py-3">
                Số điện thoại
              </td>
              <td scope="col" className="px-6 py-3">
                Role
              </td>
              <td scope="col" className="px-6 py-3">
                action
              </td>
              <td scope="col" className="px-6 py-3">active</td>
            </tr>
          </thead>
          <tbody>
            {data?.docs?.length > 0 ? data.docs.map((item, index) => (
              <tr
                key={item._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th className="px-6 py-4">{index + 1}</th>
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <p className="inline-block">{item.name}</p>
                  {isUserEditing(item._id)}
                </th>
                <th className="px-6 py-4">{item.email}</th>
                <th className="px-6 py-4">{item.address}</th>
                <th className="px-6 py-4">{item.phone}</th>
                <th className="px-6 py-4">{item.role}</th>
                <th className="px-6 py-4">
                  <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 4 15"
                      >
                        <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                      </svg>
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <button onClick={() => mutate(item)}>
                          {isPending ? 'Đang xử lý...' : 'Xóa'}
                        </button>
                      </li>
                      <li>
                        {" "}
                        <Link to={`/admin/users/edit/${item._id}`}>Sửa</Link>
                      </li>
                    </ul>
                  </div>
                </th>
                <th>
                  <label className="inline-flex items-center me-5 cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" checked={item.active} onChange={() => mutate(item)} />
                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                  </label>
                </th>
              </tr>
            ))
              :
              <tr>
                <td colSpan="7" className="text-center py-4">Không có dữ liệu</td>
              </tr>}
          </tbody>
        </table>
        <Pageination data={data} />
      </div >
    </>
  );
};

export default UserList;
