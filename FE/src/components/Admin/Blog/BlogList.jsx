import { useQuery } from "@tanstack/react-query";
import instance from "../../../config/axios";
import Pageination from "../../UI/Pagination";
import { Link } from "react-router-dom";
import { Space } from "antd";

const BlogList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["BLOGS"],
    queryFn: async () => {
      const { data } = await instance.get(`/blogs`);
      console.log(data);
      return data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Space className="font-semibold text-lg rounded-md bg-[#E9E9E9] w-full p-4">
        Danh sách blog
      </Space>
      <div className="my-8 flex justify-between">
        <Link
          to={`/admin/blogs/add`}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Thêm Blog
        </Link>
      </div>
      <div className="relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <td scope="col" className="px-6 py-3"></td>
              <td scope="col" className="px-6 py-3">Mã</td>
              <td scope="col" className="px-6 py-3">Ảnh</td>
              <td scope="col" className="px-6 py-3">Tên Blog</td>
              <td scope="col" className="px-6 py-3">Action</td>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data.map((blog, index) => (
                <tr
                  key={blog._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th className="px-6 py-4">{index + 1}</th>
                  <th className="px-6 py-4">{blog._id}</th>
                  <th className="px-6 py-4">{blog.image}</th>
                  <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <p className="inline-block">{blog.title}</p>
                  </th>
                  <th className="px-6 py-4">
                    <div className="dropdown dropdown-hover">
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
                          <Link to={`/admin/blogs/edit/${blog._id}`}>Sửa</Link>
                          <button>Xóa</button>
                          <Link to={`/admin/blogs/detail/${blog._id}`}>Chi tiết</Link>
                        </li>
                      </ul>
                    </div>
                  </th>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">Không có dữ liệu</td>
              </tr>
            )}
          </tbody>
        </table>
        <Pageination data={data} />
      </div>
    </>
  );
};

export default BlogList;