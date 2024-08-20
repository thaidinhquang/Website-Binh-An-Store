import { useTanstackMutation, useTanstackQuery } from "../../../common/hooks/useTanstackQuery";
import { useEffect, useState } from 'react';
import socket from "/src/config/socket";
import { Link, useLocation } from "react-router-dom";
import Pageination from "../../UI/Pagination";
import { useHookSearch } from "../../../common/hooks/useSearch";
import { useForm } from "react-hook-form";
import CommonUtils from "../../../common/CommonUtils/CommonUtils";
import { Button } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';


const FeedbackList = () => {
  const search = new URLSearchParams(useLocation().search);
  const sort = search.get('sort') || 'new';
  const query = search.get('query') || '';
  const form = useForm();
  const useSearch = useHookSearch();
  const { data, isLoading, refetch } = useTanstackQuery('feedback', { sort, query }, false)
  const { mutate: like } = useTanstackMutation({ path: `feedback/like`, action: "CREATE" });
  const { mutate: dislike } = useTanstackMutation({ path: `feedback/dislike`, action: "CREATE" });
  useEffect(() => {
    form.reset({ query, sort });
  }, []);

  useEffect(() => {
    refetch()
  }, [sort, query]);

  const searchForm = (data) => {
    useSearch(data, '/admin/feedback')
  }

  if (isLoading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div></div>;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <h2 className="text-2xl font-semibold mb-4 md:mb-0">Danh sách danh mục</h2>
      <div className="py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <Link to={`/admin/categories/add`} className="px-4 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out">
            Thêm danh mục
          </Link>
        </div>
        <form onSubmit={form.handleSubmit(searchForm)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-3/5 px-3 mb-4 md:mb-0">
              <input
                type="text"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Tìm kiếm theo tên hoặc ID danh mục..."
                {...form.register('query')}
              />
            </div>
            <div className="w-full md:w-1/5 px-3 mb-4 md:mb-0">
              <select
                {...form.register('sort')}
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="new">Mới {'->'} cũ</option>
                <option value="old">Cũ {'->'} mới</option>
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
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                    Mã ID
                  </th>
                  <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                    Tên
                  </th>
                  <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                    Phản hồi
                  </th>
                  <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                    Số lượt thích/không thích
                  </th>
                  <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.docs?.length > 0 ? data.docs.map((category) => (
                  <tr key={category._id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{category._id}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {category.name}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {category.message}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        <span className="text-green-500">{category.like}</span> / <span className="text-red-500">{category.dislike}</span>
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex justify-start items-center">
                        <Button
                          type="primary"
                          className="mr-2 bg-blue-400"
                          onClick={() => {
                            like({ id: category._id })
                          }}
                        >
                          Thích
                        </Button>
                        <Button
                          type="primary"
                          danger
                          onClick={() => {
                            dislike({ id: category._id })
                          }}
                        >
                          Không thích
                        </Button>
                      </div>
                    </td>
                  </tr>
                )) : <tr><td colSpan="4" className="text-center">Không có dữ liệu</td></tr>}
              </tbody>
            </table>
            <Pageination data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackList;