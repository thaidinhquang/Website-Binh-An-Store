import {
  useTanstackMutation,
  useTanstackQuery,
} from "../../../common/hooks/useTanstackQuery";
import { useEffect, useState } from "react";
import socket from "/src/config/socket";
import { Link, useLocation } from "react-router-dom";
import Pageination from "../../UI/Pagination";
import { useForm } from "react-hook-form";
import { useHookSearch } from "../../../common/hooks/useSearch";
import CommonUtils from "../../../common/CommonUtils/CommonUtils";
import { Button, Switch, Table } from "antd"; // Nhập Table từ Ant Design
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const BrandList = () => {
  const search = new URLSearchParams(useLocation().search);
  const page = search.get("page") || 1;
  const sort = search.get("sort") || "";
  const query = search.get("query") || "";
  const active = search.get("active") || "";
  const form = useForm();
  const useSearch = useHookSearch();
  const { data, isLoading, refetch } = useTanstackQuery("brands", {
    active,
    page,
    sort,
    query,
  });
  const { mutate } = useTanstackMutation({
    path: `brands`,
    action: "DELETE",
  });
  const [listUserOnEditRoute, setListUserOnEditRoute] = useState(null);

  const isUserEditing = (id) => {
    const user = listUserOnEditRoute ? listUserOnEditRoute[id] : null;
    return user ? (
      <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-full ml-2">
        {user} đang chỉnh sửa
      </span>
    ) : (
      ""
    );
  };

  useEffect(() => {
    form.reset({ query, sort, page, active });
    const handleUserEditing = (data) => {
      setListUserOnEditRoute(data);
    };
    socket.on("userEditing", handleUserEditing);
    socket.emit("getUsersEditing");
  }, []);

  useEffect(() => {
    refetch();
  }, [active, page, sort, query]);

  const searchForm = (data) => {
    useSearch(data, "/admin/brands");
  };

  const exportToExcel = async () => {
    const dataToExport = data?.docs?.map((brand) => ({
      ID: brand._id,
      Name: brand.name,
      Slug: brand.slug,
      Active: brand.active ? "Active" : "False",
      Products: brand.products.join(", "),
      CreatedAt: new Date(brand.createdAt).toLocaleString(),
      UpdatedAt: new Date(brand.updatedAt).toLocaleString(),
    }));
    await CommonUtils.exportExcel(dataToExport, "Brands", "BrandList");
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );

  // Cấu hình cột cho bảng
  const columns = [
    {
      title: "STT",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên Nhãn Hàng",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <span>{text}</span>
          <div className="text-gray-500 text-sm">Mã ID: {record._id}</div>
          {isUserEditing(record._id)}
        </div>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <div className="flex items-center text-sm">
          <Link to={`/admin/brands/edit/${record._id}`}>
            <Button icon={<EditOutlined />} />
          </Link>
        </div>
      ),
    },
    {
      title: "Trạng thái",
      key: "active",
      render: (text, record) => (
        <Switch
          checked={record.active}
          onChange={() => mutate(record)}
          checkedChildren=""
          unCheckedChildren=""
        />
      ),
    },
  ];

  return (
    <div className="">
      <h2 className="ant-space css-dev-only-do-not-override-1uq9j6g ant-space-horizontal ant-space-align-center ant-space-gap-row-small ant-space-gap-col-small font-semibold text-lg rounded-md bg-[#E9E9E9] w-full p-4">
        Danh sách nhãn hàng
      </h2>
      <div className="py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <Link
            to={`/admin/brands/add`}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Thêm nhãn hàng
          </Link>
          <Button
            onClick={exportToExcel}
            type="default"
            icon={<FontAwesomeIcon icon={faFileExcel} />}
          >
            Xuất Excel
          </Button>
        </div>
        <form
          onSubmit={form.handleSubmit(searchForm)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-2/5 px-3 mb-4 md:mb-0">
              <input
                type="text"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Tìm kiếm theo tên hoặc ID nhãn hàng..."
                {...form.register("query")}
              />
            </div>
            <div className="w-full md:w-1/5 px-3 mb-4 md:mb-0">
              <select
                {...form.register("sort")}
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="">Mới {"->"} cũ</option>
                <option value="createdAt:1">Cũ {"->"} mới</option>
              </select>
            </div>
            <div className="w-full md:w-1/5 px-3 mb-4 md:mb-0">
              <select
                {...form.register("active")}
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="">Tất cả</option>
                <option value="true">Đang hoạt động</option>
                <option value="false">Không hoạt động</option>
              </select>
            </div>
            <div className="w-full md:w-1/5 px-3">
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </form>
        <div>
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

export default BrandList;
