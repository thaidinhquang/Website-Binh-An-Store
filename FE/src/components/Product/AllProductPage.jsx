
import { useEffect, useMemo } from "react";
import Product from './Product';
import ProductsFilter from "./ProductsFilter";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useHookSearch } from "../../common/hooks/useSearch";

const AllProductPage = () => {
  const location = useLocation();
  const search = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const form = useForm();
  const useSearch = useHookSearch();
  useEffect(() => {
    const formValues = {};
    search.forEach((value, key) => {
      formValues[key] = value;
    });
    form.reset(formValues);
  }, [search, form]);

  const handleChange = (data) => {
    const newData = { ...form.getValues(), [data.name]: data.value };
    useSearch(newData, '/shop');
  };
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
                  <span className="text-qgray"> Hiển thị</span> 1–12
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
                  <span className="font-400 text-[13px]">Sắp xếp theo:</span>
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
            <Product limit={12} pagination={true} className={'grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1  xl:gap-[30px] gap-5 mb-[40px]'} />
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
