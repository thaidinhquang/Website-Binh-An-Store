
import Product from "./Product";

const AllProduct = () => {

  return (
    <div className="products-page-wrapper w-full">
    
      <div className="container-x mx-auto">
      <h1>Product</h1>
        <div className="w-full lg:flex lg:space-x-5">
          <div className="flex-1">
            <Product/>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
