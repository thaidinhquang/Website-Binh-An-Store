
import { useEffect, useState } from "react";
import Product from './Product';
import ProductsFilter from "./ProductsFilter";
import { useTanstackMutation, useTanstackQuery } from "../../common/hooks/useTanstackQuery";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useHookSearch } from "../../common/hooks/useSearch";

const AllProductPage = () => {
  const search = new URLSearchParams(useLocation().search);
  const page = search.get('page') || 1;
  const sort = search.get('sort') || '';
  const name = search.get('name') || '';
  const [volume, setVolume] = useState([200, 500]);
  const form = useForm();
  const useSearch = useHookSearch();
  const { data, isLoading, refetch } = useTanstackQuery('products', { limit: 12, active: true, page, sort, name });
  const { data: category, isLoading: isLoadingCategory } = useTanstackQuery('categories', { limit: 100, active: true });
  const { mutate, isPending } = useTanstackMutation(`cart/add-item`, 'CREATE');
  useEffect(() => {
    form.reset({ name, sort, page });
  }, []);
  useEffect(() => {
    const handle = setTimeout(() => {
      refetch();
    }, 1000);
    return () => clearTimeout(handle);
  }, [page, sort, name]);
  const handleChange = (data) => {
    const newData = { ...form.getValues(), [data.name]: data.value };
    useSearch(newData, '/shop')
  }
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="products-page-wrapper w-full">
      <div className="container-x mx-auto">
        <div className="w-full lg:flex lg:space-x-[30px]">
          <div className="lg:w-[270px]">
            <ProductsFilter
              volume={volume}
              volumeHandler={(value) => setVolume(value)}
              className="mb-[30px]"
            />
            {/* ads */}
            <div className="w-full hidden lg:block h-[295px]">
              <img
                src={`/assets/images/ads-5.png`}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="products-sorting w-full bg-white md:h-[70px] flex md:flex-row flex-col md:space-y-0 space-y-5 md:justify-between md:items-center p-[30px] mb-[40px]">
              <div>
                <p className="font-400 text-[13px]">
                  <span className="text-qgray"> Showing</span> 1–12 of {data.totalDocs}{" "}
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
              <button
                onClick={() => setToggle(!filterToggle)}
                type="button"
                className="w-10 lg:hidden h-10 rounded flex justify-center items-center border border-qyellow text-qyellow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
              </button>
            </div>
            <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1  xl:gap-[30px] gap-5 mb-[40px]">
              {data?.docs?.length > 0 ? data.docs.map((product, index) => (
                <Product key={product._id} product={product} mutate={mutate} isPending={isPending} />
              )) : <p>Không có sản phẩm nào</p>}
            </div>
            <div className="w-full h-[164px] overflow-hidden mb-[40px]">
              <img
                src={`/assets/images/ads-6.png`}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
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
