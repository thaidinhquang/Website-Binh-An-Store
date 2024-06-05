
import IconNextRight from "../icons/IconNextRight";
import Product from "./Product";

const AllProduct = () => {

  return (
    <div className="products-page-wrapper w-full">
    
      <div className="container-x mx-auto">
     <div className="flex justify-between">
     <h1 className="sm:text-3xl text-xl font-600 text-qblacktext leading-none mb-[30px]">
     Product
   </h1>
   <a href="/"><IconNextRight/></a>
     </div>
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
