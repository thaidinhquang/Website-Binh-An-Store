import { useTanstackMutation, useTanstackQuery } from "../../../common/hooks/useTanstackQuery";
import { useEffect, useState } from 'react';
import socket from "/src/config/socket";
import { Link, useLocation } from "react-router-dom";
import Pageination from "../../UI/Pagination";
import { useHookSearch } from "../../../common/hooks/useSearch";
import { useForm } from "react-hook-form";

const ProductList = () => {
  const search = new URLSearchParams(useLocation().search);
  const page = search.get('page') || 1;
  const sort = search.get('sort') || '';
  const name = search.get('name') || '';
  const active = search.get('active') || '';
  const form = useForm();
  const useSearch = useHookSearch();
  const { data, isLoading, refetch } = useTanstackQuery('products', { active, page, sort, name })
  const { mutate, isPending } = useTanstackMutation(`products`, "DELETE");
  const [listUserOnEditRoute, setListUserOnEditRoute] = useState(null);
  const isUserEditing = (id) => {
    const user = listUserOnEditRoute ? listUserOnEditRoute[id] : null;
    return user ? <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-full ml-2">{user} đang chỉnh sửa</span> : '';
  };
  useEffect(() => {
    form.reset({ name, sort, page, active });
    const handleUserEditing = (data) => {
      setListUserOnEditRoute(data);
    };
    socket.on('userEditing', handleUserEditing);
    socket.emit('getUsersEditing');
  }, []);
  useEffect(() => {
    refetch()
  }, [active, page, sort, name]);

  const searchForm = (data) => {
    useSearch(data, '/admin/products')
  }
  if (isLoading) return <p>Loading...</p>
  return (
    <>
      <div>Danh sách sản phẩm</div>
      <div className="my-8 flex justify-between">
        <Link to={`/admin/products/add`}
          className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          thêm sản phẩm
        </Link>
      </div>
      <form onSubmit={form.handleSubmit(searchForm)} className="flex justify-between gap-3">
        <input
          {...form.register('name')}
          type="text" placeholder="Tìm kiếm theo tên danh mục" className="border border-gray-300 dark:border-gray-700 p-2 h-[50px] w-full outline-none focus:border-pink-500" />
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
        <button type="submit" className="text-white  bg-blue-700 hover:bg-blue-800 font-medium text-sm px-5 py-2.5 me-2 mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 h-[50px] w-[300px]">
          Tìm kiếm
        </button>
      </form>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <td scope="col" className="px-6 py-3"></td>
              <td scope="col" className="px-6 py-3">Ảnh Sản Phẩm</td>
              <td scope="col" className="px-6 py-3" >Tên Sản Phẩm</td>
              <td scope="col" className="px-6 py-3">Giá Sản Phẩm</td>
              <td scope="col" className="px-6 py-3">Số Lượng</td>
              <td scope="col" className="px-6 py-3">action</td>
              <td scope="col" className="px-6 py-3">active</td>
            </tr>
          </thead>
          <tbody>
            {data?.docs?.length > 0 ? data.docs.map((product, index) => (
              <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th className="px-6 py-4">{index + 1}</th>
                <th className="px-6 py-4">
                  <img src={product.image} width={100} className=" rounded-lg" alt="" />
                </th>
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <p className="inline-block">{product.name}</p>
                  {isUserEditing(product._id)}
                </th>
                <th className="px-6 py-4">{product.price}</th>

                <th className="px-6 py-4">{product.stock}</th>
                <th className="px-6 py-4">
                  <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1"><svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                      <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                    </svg></div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                      <li><button onClick={() => mutate(product)}>
                        {isPending ? 'Đang xóa...' : 'Xóa'}
                      </button></li>
                      <li> <Link to={`/admin/products/edit/${product._id}`}>Sửa</Link></li>
                    </ul>
                  </div>
                </th>
                <th>
                  <label className="inline-flex items-center me-5 cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" checked={product.active} onChange={() => mutate(product)} />
                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                  </label>
                </th>
              </tr>
            )) :
              <tr>
                <td colSpan={6} className="text-center">Không có sản phẩm nào</td>
              </tr>}
          </tbody>
        </table>
        <Pageination data={data} />
      </div>
    </>
  );
};

export default ProductList;
