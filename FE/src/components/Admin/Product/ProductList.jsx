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
import TableProduct from "./TableProduct";

const ProductList = () => {

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const search = new URLSearchParams(useLocation().search);
  // const page = search.get('page') || 1;
  const sort = search.get('sort') || '';
  const name = search.get('name') || '';
  const active = search.get('active') || '';
  const form = useForm();
  const useSearch = useHookSearch();
  const { data, isLoading, refetch } = useTanstackQuery('products', { active,  page,
    limit, sort, name })
  console.log(data)
  const { mutate } = useTanstackMutation({
    path: `products`,
    action: "DELETE",
  });
  const [listUserOnEditRoute, setListUserOnEditRoute] = useState(null);
  const isUserEditing = (id) => {
    const user = listUserOnEditRoute ? listUserOnEditRoute[id] : null;
    return user ? <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-full ml-2">{user} đang chỉnh sửa</span> : '';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getStatus = (createdAt) => {
    const creationDate = new Date(createdAt);
    const now = new Date();
    const twoDays = 2 * 24 * 60 * 60 * 1000; // milliseconds in 2 days
    return now - creationDate <= twoDays ? 0 : 1;
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

  const exportToExcel = async () => {
    const dataToExport = data?.docs?.map((product, index) => ({
      STT: index + 1,
      'Tên sản phẩm': product.name,
      'Hình ảnh': product.image,
      'Biến thể': product.productItems.map(item => 
        item.variants.map(variant => `${variant.key}: ${variant.value}`).join(', ')
      ).join(' | '),
      'Giá': formatPrice(product.productItems[0]?.price),
      'Số lượng': product.productItems.reduce((total, item) => total + item.stock, 0), 
    }));
    await CommonUtils.exportExcel(dataToExport, 'Products', 'ProductList');
  };

  if (isLoading) return <p>Loading...</p>
  return (
    <>
      <div className="ant-space css-dev-only-do-not-override-1uq9j6g ant-space-horizontal ant-space-align-center ant-space-gap-row-small ant-space-gap-col-small font-semibold text-lg rounded-md bg-[#E9E9E9] w-full p-4">Danh sách sản phẩm</div>
      <div className="my-8 flex justify-between">
        <Link to={`/admin/products/add`}
          className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Thêm sản phẩm
        </Link>
        <Button onClick={exportToExcel} type="default" icon={<FontAwesomeIcon icon={faFileExcel} />}>
        Xuất Excel
      </Button>
      </div>
      <form onSubmit={form.handleSubmit(searchForm)} className="flex justify-between gap-3">
        <input
          {...form.register('name')}
          type="text" placeholder="Tìm kiếm theo tên sản phẩm" className="border border-gray-300 dark:border-gray-700 p-2 h-[50px] w-full outline-none focus:border-pink-500" />
        <select
          {...form.register('sort')}
          className="border border-gray-300 dark:border-gray-700 p-2 h-[50px] w-[200px]">
          <option value="">Mới {'->'} cũ</option>
          <option value="createdAt:1">Cũ {'->'} mới</option>
        </select>
       
        <button type="submit" className="text-white  bg-blue-700 hover:bg-blue-800 font-medium text-sm px-5 py-2.5 me-2 mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 h-[50px] w-[300px]">
          Tìm kiếm
        </button>
      </form>
      <TableProduct
        product={data}
        setPage={setPage}
        setLimit={setLimit}
      />
    </>
  );
};

export default ProductList;
        