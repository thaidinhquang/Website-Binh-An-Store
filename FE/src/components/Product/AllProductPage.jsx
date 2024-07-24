
import { useEffect, useState } from "react";
import Product from './Product';
import ProductsFilter from "./ProductsFilter";
import { useTanstackMutation, useTanstackQuery } from "../../common/hooks/useTanstackQuery";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useHookSearch } from "../../common/hooks/useSearch";
import Pageination from "../UI/Pagination";

const AllProductPage = () => {
  const search = new URLSearchParams(useLocation().search);
  const page = search.get('page') || 1;
  const sort = search.get('sort') || '';
  const name = search.get('name') || '';
  const categories = search.get('categories') || '';
  const form = useForm();
  const useSearch = useHookSearch();
  const { data, isLoading, refetch, isFetching } = useTanstackQuery('products', { limit: 12, active: true, page, sort, name, categories });
  const { mutate, isPending } = useTanstackMutation({
    path: `cart/add-item`,
    action: "CREATE",
  });
  useEffect(() => {
    form.reset({ name, sort, page, categories });
  }, []);
  useEffect(() => {
    form.reset({ categories });
  }, [categories]);
  useEffect(() => {
    const handle = setTimeout(() => {
      refetch();
    }, 1000);
    return () => clearTimeout(handle);
  }, [page, sort, name, categories]);
  const handleChange = (data) => {
    const newData = { ...form.getValues(), [data.name]: data.value };
    useSearch(newData, '/shop')
  }
  if (isLoading) return <p>Đang tải...</p>;
  return (
    <div className="products-page-wrapper w-full">
      <div className="container-x mx-auto">
        <div className="w-full lg:flex lg:space-x-[30px]">
          <div className="lg:w-[270px]">
            <ProductsFilter />
          </div>
          <div className="flex-1">
            <div className="products-sorting w-full bg-white md:h-[70px] flex md:flex-row flex-col md:space-y-0 space-y-5 md:justify-between md:items-center p-[30px] mb-[40px]">
              <div>
                <p className="font-400 text-[13px]">
                  <span className="text-qgray"> Showing</span> 1–12 of {data?.totalDocs}{" "}
                  results
                </p>
              </div>
              <div className="flex space-x-3 items-center">
                <div className="flex space-x-3 items-center">
                  <div className="flex space-x-3 items-center border-b border-b-qgray">
                    <input className="bg-white text-xs max-w-[100px] w-full"
                      {...form.register('name')}
                      onChange={(e) => handleChange(e.target)}
                      type="text" placeholder="Tìm kiếm" />
                  </div>
                </div>
                <div className="flex space-x-3 items-center">
                  <span className="font-400 text-[13px]">Sort by:</span>
                  <div className="flex space-x-3 items-center border-b border-b-qgray">
                    <select className="bg-white text-xs"
                      {...form.register('sort')}
                      onChange={(e) => handleChange(e.target)}>
                      <option value="">Mới {'->'} cũ</option>
                      <option value="createdAt:1">Cũ {'->'} mới</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1  xl:gap-[30px] gap-5 mb-[40px]">
              {isFetching ? <p>Đang tải...</p> : data?.docs?.length > 0 ? data.docs.map((product, index) => (
                <Product key={product._id} product={product} mutate={mutate} isPending={isPending} />
              )) : <p>Không có sản phẩm nào</p>}
            </div>
            <Pageination data={data} />
            <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 mb-[40px]">
              { }
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default AllProductPage;
