import {
  useTanstackMutation,
  useTanstackQuery,
} from "../../../common/hooks/useTanstackQuery";
import { useEffect, useState } from "react";
import socket from "/src/config/socket";
import { Link, useLocation } from "react-router-dom";
import Pageination from "../../UI/Pagination";
import { useHookSearch } from "../../../common/hooks/useSearch";
import { useForm } from "react-hook-form";
import CommonUtils from "../../../common/CommonUtils/CommonUtils";
import { Button, Table } from "antd"; // Nhập Table từ Ant Design
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const CategoryList = () => {
  const search = new URLSearchParams(useLocation().search);
  const sort = search.get("sort") || "new";
  const query = search.get("query") || "";
  const form = useForm();
  const useSearch = useHookSearch();
  const { data, isLoading, refetch } = useTanstackQuery(
    "categories/details",
    { sort, query },
    false
  );
  const { mutate } = useTanstackMutation({
    path: `categories`,
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
    form.reset({ query, sort });
    const handleUserEditing = (data) => {
      setListUserOnEditRoute(data);
    };
    socket.on("userEditing", handleUserEditing);
    socket.emit("getUsersEditing");
  }, []);

  useEffect(() => {
    refetch();
  }, [sort, query]);

  const searchForm = (data) => {
    useSearch(data, "/admin/categories");
  };

  const exportToExcel = async () => {
    const dataToExport = data?.docs?.map((category) => ({
      ID: category._id,
      Name: category.name,
      Slug: category.slug,
      ProductCount: category.products.length,
      ProductID: category.products.join(", "),
      CreatedAt: new Date(category.createdAt).toLocaleString(),
      UpdatedAt: new Date(category.updatedAt).toLocaleString(),
    }));
    await CommonUtils.exportExcel(dataToExport, "Categories", "CategoryList");
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
      title: 'STT',
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên Danh Mục",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <span>{text}</span>
          <div className="text-gray-500 text-sm">{record._id}</div>
          {isUserEditing(record._id)}
        </div>
      ),
    },
    {
      title: "Chi tiết",
      dataIndex: "details",
      key: "details",
      render: (details) => (
        <>
          {details.map((detail, index) => (
            <span
              key={index}
              className="bg-purple-500 text-white mr-1 py-1 px-2 rounded-lg"
            >
              {detail.key}
            </span>
          ))}
        </>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <div className="flex items-center text-sm">
          <Link to={`/admin/categories/edit/${record._id}`}>
            <Button icon={<EditOutlined />} />
          </Link>
          <Button type="link" onClick={() => mutate(record._id)}>
            <Button icon={<DeleteOutlined />} danger />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="">
   
      <div className="py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <Link
            to={`/admin/categories/add`}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Thêm danh mục
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
            <div className="w-full md:w-3/5 px-3 mb-4 md:mb-0">
              <input
                type="text"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Tìm kiếm theo tên hoặc ID danh mục..."
                {...form.register("query")}
              />
            </div>
            <div className="w-full md:w-1/5 px-3 mb-4 md:mb-0">
              <select
                {...form.register("sort")}
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="new">Mới {"->"} cũ</option>
                <option value="old">Cũ {"->"} mới</option>
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
    
          <Table
            dataSource={data}
            columns={columns}
            rowKey="_id"
            pagination={false}
            
          />
      
        <Pageination data={data} />
      </div>
    </div>
  );
};

export default CategoryList;
