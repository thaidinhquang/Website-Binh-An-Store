import { useState } from "react";
import Star from "../icons/Star";
import { useParams } from "react-router-dom";
import { useTanstackQuery } from "../../common/hooks/useTanstackQuery";

const ProductView = ({ className, reportHandler }) => {
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    error,
  } = useTanstackQuery(`/products/${id}`);
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(prevQuantity => {
      const newQuantity = prevQuantity + 1;
      console.log('Số lượng Tăng 1:', newQuantity);
      return newQuantity;
    });
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => {
      const newQuantity = prevQuantity > 1 ? prevQuantity - 1 : 1;
      console.log('Số lượng giảm 1:', newQuantity);
      return newQuantity;
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product details</p>;

  return (
    <form>
      <div
        className={`product-view w-full lg:flex justify-between ${
          className || ""
        }`}
      >
        <div
          data-aos="fade-right"
          className="lg:w-1/2 xl:mr-[70px] lg:mr-[50px]"
        >
          <div className="w-full">
            <div className="w-full h-[600px] border border-qgray-border flex justify-center items-center overflow-hidden relative mb-3">
              <img
                src={product.image}
                alt=""
                className="object-contain w-full"
              />
              <div className="w-[80px] h-[80px] rounded-full bg-qyellow text-qblack flex justify-center items-center text-xl font-medium absolute left-[30px] top-[30px]">
                <span>-50%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="product-details w-full mt-10 lg:mt-0">
            <span
              data-aos="fade-up"
              className="text-qgray text-xs font-normal uppercase tracking-wider mb-2 inline-block"
            >
              Mobile Phones
            </span>
            <p
              data-aos="fade-up"
              className="text-xl font-medium text-qblack mb-4"
            >
              {product.name}
            </p>
            <div
              data-aos="fade-up"
              className="flex space-x-[10px] items-center mb-6"
            >
              <div className="flex">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </div>
              <span className="text-[13px] font-normal text-qblack">
                6 Reviews
              </span>
            </div>
            <div
              data-aos="fade-up"
              className="flex space-x-2 items-center mb-7"
            >
              <span className="text-sm font-500 text-qgray line-through mt-2">
                $9.99
              </span>
              <span className="text-2xl font-500 text-qred">
                {product.price}
              </span>
            </div>
            <p
              data-aos="fade-up"
              className="text-qgray text-sm text-normal mb-[30px] leading-7"
            >
              It is a long established fact that a reader will be distracted by
              the readable there content of a page when looking at its layout.
            </p>
            <div
              data-aos="fade-up"
              className="quantity-card-wrapper w-full flex items-center h-[50px] space-x-[10px] mb-[30px]"
            >
              <div className="w-[120px] h-full px-[26px] flex items-center border border-qgray-border">
                <div className="flex justify-between items-center w-full">
                  <button
                    onClick={handleDecrement}
                    type="button"
                    className="text-base text-qgray"
                  >
                    -
                  </button>
                  <span className="text-qblack">{quantity}</span>
                  <button
                    onClick={handleIncrement}
                    type="button"
                    className="text-base text-qgray"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="w-[60px] h-full flex justify-center items-center border border-qgray-border">
                <button type="button">
                  <span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 1C14.9 1 13.1 2.1 12 3.7C10.9 2.1 9.1 1 7 1C3.7 1 1 3.7 1 7C1 13 12 22 12 22C12 22 23 13 23 7C23 3.7 20.3 1 17 1Z"
                        stroke="#D5D5D5"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                        strokeLinecap="square"
                      />
                    </svg>
                  </span>
                </button>
              </div>
              <div className="flex-1 h-full">
                <button
                  type="submit"
                  className="black-btn text-sm font-semibold w-full h-full"
                >
                  Add To Cart
                </button>
              </div>
            </div>
            <div data-aos="fade-up" className="mb-[20px]">
              <p className="text-[13px] text-qgray leading-7">
                <span className="text-qblack">Category :</span> Kitchen
              </p>
              <p className="text-[13px] text-qgray leading-7">
                <span className="text-qblack">Tags :</span> Beer, Foamer
              </p>
              <p className="text-[13px] text-qgray leading-7">
                <span className="text-qblack">SKU:</span> KE-91039
              </p>
            </div>
            <div
              data-aos="fade-up"
              className="flex space-x-2 items-center mb-[20px]"
            >
              <span>
                <svg
                  width="12"
                  height="13"
                  viewBox="0 0 12 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 0C0.247634 0 0.475436 0 0.729172 0C0.738324 0.160174 0.747477 0.316279 0.757647 0.493233C1.05816 0.392044 1.33885 0.282211 1.62818 0.203395C3.11296 -0.201361 4.51385 0.0366111 5.84202 0.779512C6.47661 1.13494 7.14171 1.39071 7.86987 1.47207C8.88125 1.58496 9.82093 1.35817 10.7098 0.88426C10.9335 0.765274 11.1522 0.636627 11.411 0.491199C11.4161 0.606117 11.4237 0.693577 11.4237 0.780529C11.4242 3.18822 11.4222 5.5954 11.4288 8.00309C11.4293 8.1892 11.3718 8.29089 11.2096 8.38039C9.31956 9.42279 7.4285 9.43499 5.54557 8.37734C4.06231 7.54443 2.55363 7.43307 0.992568 8.13835C0.804428 8.22327 0.737816 8.33005 0.739341 8.53904C0.749003 9.9206 0.744426 11.3027 0.744426 12.6842C0.744426 12.7849 0.744426 12.8851 0.744426 13C0.48764 13 0.265823 13 0 13C0 8.66634 0 4.33277 0 0Z"
                    fill="#D5D5D5"
                  />
                  <path
                    d="M5.17567 5.8202C5.17411 4.52091 6.2855 3.45296 7.54608 3.47337C8.73868 3.49292 9.83678 4.51628 9.8311 5.80426C9.82593 7.0709 8.70203 8.19342 7.43526 8.17978C6.27198 8.16749 5.17724 7.04002 5.17567 5.8202Z"
                    fill="#D5D5D5"
                  />
                </svg>
              </span>
              <button
                onClick={reportHandler}
                type="button"
                className="text-[13px] text-qblack font-medium"
              >
                Report incorrect product information
              </button>
            </div>
            <div data-aos="fade-up" className="border-t border-qgray-border">
              <div className="w-full">
                <ul
                  className="flex justify-center items-center my-[30px]"
                  role="tablist"
                >
                  <li className="tab_nav_list">
                    <button
                      type="button"
                      className="text-sm font-semibold text-qblack focus:outline-none"
                      role="tab"
                    >
                      Description
                    </button>
                  </li>
                  <li className="tab_nav_list">
                    <button
                      type="button"
                      className="text-sm font-normal text-qgray focus:outline-none"
                      role="tab"
                    >
                      Additional Info
                    </button>
                  </li>
                  <li className="tab_nav_list">
                    <button
                      type="button"
                      className="text-sm font-normal text-qgray focus:outline-none"
                      role="tab"
                    >
                      Reviews
                    </button>
                  </li>
                </ul>
                <div className="tab_content text-qgray text-sm">
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using ‘Content here, content here’, making it look like
                    readable English. Many desktop publishing packages and web
                    page editors now use Lorem Ipsum as their default model
                    text, and a search for ‘lorem ipsum’ will uncover many web
                    sites still in their infancy. Various versions have evolved
                    over the years, sometimes by accident, sometimes on purpose
                    (injected humour and the like).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductView;
