import { useState } from "react";
import Product from './Product';
import ProductsFilter from "./ProductsFilter";
import BreadcrumbCom from "../UI/BreadcrumbCom";
import DataIteration from "../UI/DataIteration";
import { useTanstackQuery } from "../../common/hooks/useTanstackQuery";

const AllProductPage = () => {
  const [filters, setFilter] = useState({});
  const { data: products, isLoading } = useTanstackQuery('products');

  const checkboxHandler = (e) => {
    const { id, checked } = e.target;
    setFilter((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  const filteredProducts = products?.filter(product => {
    if (Object.keys(filters).length === 0) {
      return true; // No filters applied, show all products
    }
    return filters[product.category._id];
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="products-page-wrapper w-full">
      <div className="container-x mx-auto">
        <BreadcrumbCom />
        <div className="w-full lg:flex lg:space-x-[30px]">
          <div className="lg:w-[270px]">
            <ProductsFilter
              filters={filters}
              checkboxHandler={checkboxHandler}
              className="mb-[30px]"
            />
            {/* Optionally add an advertisement or any other content here */}
          </div>

          <div className="flex-1">
            <div className="products-sorting w-full bg-white md:h-[70px] flex md:flex-row flex-col md:space-y-0 space-y-5 md:justify-between md:items-center p-[30px] mb-[40px]">
              <div>
                <p className="font-400 text-[13px]">
                  <span className="text-qgray"> Showing</span> 1–16 of {filteredProducts?.length} results
                </p>
              </div>
              <div className="flex space-x-3 items-center">
                <span className="font-400 text-[13px]">Sort by:</span>
                <div className="flex space-x-3 items-center border-b border-b-qgray">
                  <span className="font-400 text-[13px] text-qgray">
                    Default
                  </span>
                  {/* Optionally add sorting functionality here */}
                </div>
              </div>
              {/* Optionally add a mobile view toggle button here */}
            </div>
            <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 mb-[40px]">
              <DataIteration data={filteredProducts} startLength={0} endLength={filteredProducts.length}>
                {({ data: product }) => (
                  <div data-aos="fade-up" key={product._id}>
                    <Product  
                      product={product}
                    />
                  </div>
                )}
              </DataIteration>
            </div>

            {/* Optionally add an advertisement or any other content here */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProductPage;
