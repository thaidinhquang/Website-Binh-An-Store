import { useTanstackMutation, useTanstackQuery } from "../../../common/hooks/useTanstackQuery";
import { useEffect, useState } from 'react';
import socket from "/src/config/socket";
import { Link, useLocation } from "react-router-dom";
import Pageination from "../../UI/Pagination";

const UserList = () => {
  const page = new URLSearchParams(useLocation().search).get('page') || 1;
  const isTrash = useLocation().pathname.includes('trash');
  const { data, isLoading, refetch } = useTanstackQuery('users', {
    active: isTrash ? false : true,
    page
  })
  console.log(data);
  const { mutate, isPending } = useTanstackMutation(`users`, isTrash ? "RESTORE" : "DELETE");
  const [listUserOnEditRoute, setListUserOnEditRoute] = useState(null);
  const isUserEditing = (id) => {
    const user = listUserOnEditRoute ? listUserOnEditRoute[id] : null;
    return user ? <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-full ml-2">{user} đang chỉnh sửa</span> : '';
  };
  useEffect(() => {
    const handleUserEditing = (data) => {
      setListUserOnEditRoute(data);
    };
    socket.on('userEditing', handleUserEditing);
    socket.emit('getUsersEditing');
  }, []);
  useEffect(() => {
    refetch()
  }, [isTrash]);
  useEffect(() => {
    refetch()
  }, [page]);
  if (isLoading) return <p>Loading...</p>
  return (
    <>
      <div>Danh sách nguời dùng</div>
      <div className="my-8 flex justify-between">
        <Link to={`/admin/users/add`}
          className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          thêm người dùng
        </Link>
        <Link to={isTrash ? '/admin/users' : '/admin/users/trash'}
          className="text-white  bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
        >
          {isTrash ? 'Danh sách' : 'Thùng rác'}
        </Link>
      </div>
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
                          {isPending ? (isTrash ? 'Đang hồi sinh' : 'Đang xóa...') : (isTrash ? 'Khôi phục' : 'Xóa')}
                        </button>
                      </li>
                      <li>
                        {" "}
                        <Link to={`/admin/users/edit/${item._id}`}>Sửa</Link>
                      </li>
                    </ul>
                  </div>
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
