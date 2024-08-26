import { useEffect, useRef, useState } from "react";
import BreadcrumbCom from "../UI/BreadcrumbCom";
import Reviews from "./Reviews";
import ProductView from "./ProductView";
import { useParams } from "react-router-dom";
import { useTanstackQuery } from "../../common/hooks/useTanstackQuery";
import ProductNew from "../Product/ProductNew";
import ProductRelated from "../Product/ProductRelated";

const SingleProduct = () => {
  const [tab, setTab] = useState("des");
  const [showFullDescription, setShowFullDescription] = useState(false); // Add state for toggling description
  const reviewElement = useRef(null);

  const { id } = useParams();
  const { data: product } = useTanstackQuery(`/products/${id}`);

  const toggleDescriptionVisibility = () => {
    setShowFullDescription(!showFullDescription);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="pt-0 pb-0">
        <div className="single-product-wrapper w-full ">
          <div className="product-view-main-wrapper bg-white pt-[30px] w-full">
            <div className="breadcrumb-wrapper w-full ">
              <div className="container-x mx-auto">
                <BreadcrumbCom
                  paths={[
                    { name: "home", path: "/" },
                    { name: "shop", path: `` },
                    { name: product?.name, path: `/detail/${id}` },
                  ]}
                />
              </div>
            </div>
            <div className="w-full bg-white pb-[60px]">
              <div className="container-x mx-auto">
                <ProductView />
              </div>
            </div>
          </div>

          <div
            className="product-des-wrapper w-full relative pb-[60px]"
            ref={reviewElement}
          >
            <div className="tab-buttons w-full mb-10 mt-5 sm:mt-0">
              <div className="container-x mx-auto">
                <ul className="flex space-x-12 ">
                  <li>
                    <span
                      onClick={() => setTab("des")}
                      className={`py-[15px] sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer ${tab === "des"
                          ? "border-qyellow text-qblack "
                          : "border-transparent text-qgray"
                        }`}
                    >
                      Mô Tả
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={() => setTab("review")}
                      className={`py-[15px] sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer ${tab === "review"
                          ? "border-qyellow text-qblack "
                          : "border-transparent text-qgray"
                        }`}
                    >
                      Đánh Giá
                    </span>
                  </li>
                </ul>
              </div>
              <div className="w-full h-[1px] bg-[#E8E8E8] absolute left-0 sm:top-[50px] top-[36px] -z-10"></div>
            </div>
            <div className="tab-contents w-full min-h-[400px] ">
              <div className="container-x mx-auto">
                {tab === "des" && (
                  <div data-aos="fade-up" className="w-full tab-content-item">
                    <p className="text-[15px] text-qgray text-normal mb-10">
                      {showFullDescription
                        ? product?.description
                        : `${product?.description.substring(0, 1000)}...`}
                    </p>
                    <button
                      onClick={toggleDescriptionVisibility}
                      className="text-blue-500"
                    >
                      {showFullDescription ? "Thu gọn" : "Xem thêm"}
                    </button>
                  </div>
                )}
                {tab === "review" && (
                  <div data-aos="fade-up" className="w-full tab-content-item">
                    <h6 className="text-[18px] font-medium text-qblack mb-2">
                      Reviews
                    </h6>
                    <div className="w-full">
                      <Reviews />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="related-product w-full bg-white">
            <div className="container-x mx-auto">
              <div className="w-full py-[60px]">
                <h1 className="sm:text-3xl text-xl font-600 text-qblacktext leading-none mb-[30px]">
                </h1>
                <ProductNew related={id} category={product?.category._id} />
                <ProductNew />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;