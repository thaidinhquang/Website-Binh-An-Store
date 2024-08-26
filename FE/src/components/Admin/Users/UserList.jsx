import { useTanstackMutation, useTanstackQuery } from "../../../common/hooks/useTanstackQuery";
import { useContext, useEffect, useState } from 'react';
import socket from "/src/config/socket";
import { Link, useLocation } from "react-router-dom";
import Pageination from "../../UI/Pagination";
import { useForm } from "react-hook-form";
import { useHookSearch } from "../../../common/hooks/useSearch";
import { AuthContext } from "../../Auth/core/Auth";
import CommonUtils from "../../../common/CommonUtils/CommonUtils";
import { Button, Table } from "antd"; // Nhập Table từ Ant Design
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { EditOutlined } from "@ant-design/icons";

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
  const { currentUser } = useContext(AuthContext);
  const { data: dataRole, isLoading: isLoadingRole } = useTanstackQuery('role');
  const { data, isLoading, refetch } = useTanstackQuery('users', { active, page, sort, name, email, phone, role });
  const { mutate } = useTanstackMutation({
    path: `users`,
    action: "DELETE",
  });
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
    refetch();
  }, [active, page, sort, name, email, phone, role]);

  const searchForm = (data) => {
    useSearch(data, '/admin/users');
  };

  const exportToExcel = async () => {
    const dataToExport = data?.docs?.map(user => ({
      ID: user._id,
      Name: user.name,
      Email: user.email,
      Address: user.address,
      Phone: user.phone,
      Role: user.role,
      Active: user.active ? 'Active' : 'False',
      CreatedAt: new Date(user.createdAt).toLocaleString(),
      UpdatedAt: new Date(user.updatedAt).toLocaleString()
    }));
    await CommonUtils.exportExcel(dataToExport, 'Users', 'UserList');
  };

  if (isLoading || isLoadingRole) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div></div>;

  // Cấu hình cột cho bảng
  const columns = [
    {
      title: 'STT',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      render: (text, record) => (
        <div>
          <p className="text-gray-900 whitespace-no-wrap">{text}</p>
          {isUserEditing(record._id)}
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
    },
    {
      title: 'Role',
      dataIndex: 'role',
    },
    {
      title: 'Hành động',
      render: (text, record) => (
        <Link to={`/admin/users/edit/${record._id}`} >
          <Button icon={<EditOutlined />} />
        </Link>
      )
    },
    {
      title: 'Trạng thái',
      render: (text, record) => (
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={record.active}
            onChange={() => mutate(record)}
            disabled={currentUser?._id === record._id || record.role === 'admin'}
          />
          <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 ${
            currentUser?._id === record._id || record.role === 'admin'
              ? 'peer-checked:bg-red-600 cursor-not-allowed'
              : 'peer-checked:bg-blue-600'
          }`}></div>
        </label>
      ),
    },
  ];

  
  return (
    <div className="">
      <h2 className="ant-space css-dev-only-do-not-override-1uq9j6g ant-space-horizontal ant-space-align-center ant-space-gap-row-small ant-space-gap-col-small font-semibold text-lg rounded-md bg-[#E9E9E9] w-full p-4">Danh sách người dùng</h2>
      <div className="py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          
          <Button onClick={exportToExcel} type="default" icon={<FontAwesomeIcon icon={faFileExcel} />}>
            Xuất Excel
          </Button>
        </div>
        <form onSubmit={form.handleSubmit(searchForm)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
              <input
                type="text"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Tìm kiếm theo tên"
                {...form.register('name')}
              />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
              <input
                type="text"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Tìm kiếm theo email"
                {...form.register('email')}
              />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
              <input
                type="text"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Tìm kiếm theo sdt"
                {...form.register('phone')}
              />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
              <select
                {...form.register('role')}
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="">Tất cả</option>
                {dataRole?.map((item) => (
                  <option key={item._id} value={item.name}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/3 px-3 mb-4 md:mb-0">
              <select
                {...form.register('sort')}
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="">Mới {'->'} cũ</option>
                <option value="createdAt:1">Cũ {'->'} mới</option>
              </select>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-4 md:mb-0">
              <select
                {...form.register('active')}
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="">Tất cả</option>
                <option value={true}>Admin</option>
                <option value={false}>User</option>
              </select>
            </div>
            <div className="w-full md:w-1/3 px-3">
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </form>
        <div className="">
          <div className="">
            <Table
              dataSource={data?.docs}
              columns={columns}
              rowKey="_id"
              pagination={false}
              className="mt-4"
            />
            <Pageination data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;