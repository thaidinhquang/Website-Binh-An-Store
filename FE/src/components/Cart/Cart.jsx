import { Link } from "react-router-dom";
import { useTanstackMutation, useTanstackQuery } from "../../common/hooks/useTanstackQuery";
import { useState, useEffect } from "react";

const Cart = ({ className, type }) => {
  const { data: cartData } = useTanstackQuery('cart');
  const { data: cartTotal } = useTanstackQuery('cart/total');
  const { mutate: removeProduct } = useTanstackMutation({
    path: `cart/remove-item`,
    action: "CREATE",
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (cartData) {
      setProducts(cartData.products);
    }
  }, [cartData]);

  const onHandleRemove = (productId) => {
    removeProduct({ productId });
    setProducts((prevProducts) => prevProducts.filter(item => item.productId._id !== productId));
  };

  const calculateTotalPrice = (item) => {
    return item?.productId?.price * item?.quantity;
  };
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price); 
  };

  return (
    <div>
      <div
        style={{ boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.14)" }}
        className={`w-[300px] bg-white border-t-[3px] pt-8 ${type === 3 ? "border-qh3-blue" : "cart-wrappwer"} ${className || ""}`}
      >
        <div className="w-full h-full flex flex-col">
          <div className="flex-1 overflow-y-auto max-h-[310px]">
            <ul>
              {!products.length ? (
                <li className="w-full h-full flex justify-center items-center">
                  <p className="text-[15px] font-500 text-qblack">
                    Không có sản phẩm nào!
                  </p>
                </li>
              ) : (
                products.map((item, index) => {
                  return (
                    <li className="w-full h-full flex justify-between" key={index}>
                      <div className="flex space-x-[6px] justify-center items-center px-4 my-[20px]">
                        <div className="w-[65px]">
                          <img
                            src={item?.image||item?.productId?.image }
                            className="w-full h-full object-cover"
                            alt={item?.productId?.name}
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                          <div className="title mb-2 text-[13px] font-600 text-qblack leading-4 line-clamp-2 hover:text-blue-600">
                            {item.name}
                            <span className="text-gray-400"> * {item.quantity}</span>
                            <div className="mt-2 text-gray-500 text-xs">
                            {item?.productId?.variants?.map(variant => variant.value).join(", ")}
                            </div>
                          </div>
                          <p className="price">
                            <span className="offer-price text-qred font-600 text-[15px] ">
                            {formatPrice(calculateTotalPrice(item))}
                            </span>
                          </p>
                        </div>
                      </div>
                      <span onClick={() => onHandleRemove(item.productId._id)} className="mt-[20px] mr-[15px] inline-flex cursor-pointer">
                        <svg
                          width="8"
                          height="8"
                          viewBox="0 0 8 8"
                          fill="none"
                          className="inline fill-current text-[#AAAAAA] hover:text-qred"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7.76 0.24C7.44 -0.08 6.96 -0.08 6.64 0.24L4 2.88L1.36 0.24C1.04 -0.08 0.56 -0.08 0.24 0.24C-0.08 0.56 -0.08 1.04 0.24 1.36L2.88 4L0.24 6.64C-0.08 6.96 -0.08 7.44 0.24 7.76C0.56 8.08 1.04 8.08 1.36 7.76L4 5.12L6.64 7.76C6.96 8.08 7.44 8.08 7.76 7.76C8.08 7.44 8.08 6.96 7.76 6.64L5.12 4L7.76 1.36C8.08 1.04 8.08 0.56 7.76 0.24Z" />
                        </svg>
                      </span>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
          <div className="w-full px-4 mt-[20px] mb-[12px]">
            <div className="h-[1px] bg-[#F0F1F3]"></div>
          </div>
          <div className="product-actions px-4 mb-[30px]">
            <div className="total-equation flex justify-between items-center mb-[28px]">
              <span className="text-[15px] font-500 text-qblack">Subtotal</span>
              <span className="text-[15px] font-500 text-qred">
                {formatPrice(cartTotal)}
              </span>
            </div>
            <div className="product-action-btn">
              <Link to="/cart">
                <div className="w-full h-[50px]">
                  <div className={"yellow-btn"}>
                    <span className="text-sm">View Cart</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;