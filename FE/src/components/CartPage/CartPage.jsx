import BreadcrumbCom from "../UI/BreadcrumbCom";
import InputCom from "../UI/InputCom";
import PageTitle from "../UI/PageTitle";
import { useEffect, useState } from "react";
// import ProductsTable from "./ProductsTable";

const CartPage = ({ cart = true, className }) => {
  const [cartItems, setcartItems] = useState([]);

  useEffect(() => {
    // lay du lieu trong localStorage
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setcartItems(storedCartItems);
  }, []);

  const calculateTotalPrice = (item) => {
    return item.price * item.quantity;
  };
  const handleIncrease = (item) => {
    item.quantity += 1;
    setcartItems([...cartItems]);
    // update localStorgage
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) item.quantity -= 1;
    setcartItems([...cartItems]);
    // update localStorgage
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };
  //  ........
  const handleRemoveItems = (item) => {
    const updateCart = cartItems.filter((cartItem) => cartItem.id !== item.id);

    setcartItems(updateCart);
    updateLocalStorgage(updateCart)
  };

  const updateLocalStorgage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const cartSubtotal = cartItems.reduce((total, item) => {
    return total + calculateTotalPrice(item);
  }, 0);

  const oderTotal = cartSubtotal;

  return (
    <div className={cart ? "pt-0 pb-0" : ""}>
      {cart === false ? (
        <div className="cart-page-wrapper w-full">
          <div className="container-x mx-auto">
            <BreadcrumbCom
              paths={[
                { name: "home", path: "/" },
                { name: "cart", path: "/cart" },
              ]}
            />
          </div>
        </div>
      ) : (
        <div className="cart-page-wrapper w-full bg-white pb-[60px]">
          <div className="w-full">
            <PageTitle
              title="Your Cart"
              breadcrumb={[
                { name: "home", path: "/" },
                { name: "cart", path: "/cart" },
              ]}
            />
          </div>
          <div className="w-full mt-[23px]">
            <div className="container-x mx-auto">
              {/* Chinh sua */}
              <div className="mb-[30px]">
                <div className={`w-full ${className || ""}`}>
                  <div className="relative w-full overflow-x-auto border border-[#EDEDED]">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead>
                        <tr>
                          <th className="py-4 whitespace-nowrap text-center">
                            ID
                          </th>
                          <td className="py-4 pl-10 block whitespace-nowrap min-w-[300px]">
                            Product
                          </td>
                          <th className="py-4 whitespace-nowrap text-center">
                            Price
                          </th>
                          <th className="py-4 whitespace-nowrap text-center">
                            Quantity
                          </th>
                          <th className="py-4 whitespace-nowrap text-center">
                            Total
                          </th>
                          <th className="py-4 whitespace-nowrap text-center">
                            Edit
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item, index) => (
                          <tr
                            key={index}
                            className="bg-white border-b hover:bg-gray-50"
                          >
                            <td className="text-center py-4 px-2">
                              <div className="flex space-x-1 items-center justify-center">
                                <span className="text-[15px] font-normal">
                                  {index + 1}
                                </span>
                              </div>
                            </td>

                            <td className="pl-10 py-4 w-[380px]">
                              <div className="flex space-x-6 items-center">
                                <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
                                  <img
                                    src={item.image}
                                    alt="product"
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <div className="flex-1 flex flex-col">
                                  <p className="font-medium text-[15px] text-qblack">
                                    {item.name}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="text-center py-4 px-2">
                              <div className="flex space-x-1 items-center justify-center">
                                <span className="text-[15px] font-normal">
                                  {item.price}
                                </span>
                              </div>
                            </td>

                            <td className="py-4">
                              <div className="flex justify-center items-center space-x-2">
                                <button
                                  onClick={() => handleDecrease(item)}
                                  className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded"
                                >
                                  -
                                </button>
                                <input
                                  type="text"
                                  value={item.quantity}
                                  readOnly
                                  className="w-12 text-center border border-gray-300 rounded"
                                />
                                <button
                                  onClick={() => handleIncrease(item)}
                                  className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded"
                                >
                                  +
                                </button>
                              </div>
                            </td>

                            <td className="text-right py-4">
                              <div className="flex space-x-1 items-center justify-center">
                                <span className="text-[15px] font-normal">
                                  ${calculateTotalPrice(item)}
                                </span>
                              </div>
                            </td>

                            <td className="text-right py-4">
                              <div className="flex space-x-1 items-center justify-center">
                                <span onClick={() => handleRemoveItems(item)}>
                                  <svg
                                    width="10"
                                    height="10"
                                    viewBox="0 0 10 10"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="cursor-pointer"
                                  >
                                    <path
                                      d="M9.7 0.3C9.3 -0.1 8.7 -0.1 8.3 0.3L5 3.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L3.6 5L0.3 8.3C-0.1 8.7 -0.1 9.3 0.3 9.7C0.7 10.1 1.3 10.1 1.7 9.7L5 6.4L8.3 9.7C8.7 10.1 9.3 10.1 9.7 9.7C10.1 9.3 10.1 8.7 9.7 8.3L6.4 5L9.7 1.7C10.1 1.3 10.1 0.7 9.7 0.3Z"
                                      fill="#AAAAAA"
                                    />
                                  </svg>
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* ke thuc Chinh sua */}

              <div className="w-full sm:flex justify-between">
                <div className="discount-code sm:w-[270px] w-full mb-5 sm:mb-0 h-[50px] flex">
                  <div className="flex-1 h-full">
                    <InputCom type="text" placeholder="Discount Code" />
                  </div>
                  <button type="button" className="w-[90px] h-[50px] black-btn">
                    <span className="text-sm font-semibold">Apply</span>
                  </button>
                </div>
                <div className="flex space-x-2.5 items-center">
                  <a href="#">
                    <div className="w-[220px] h-[50px] bg-[#F6F6F6] flex justify-center items-center">
                      <span className="text-sm font-semibold">
                        Continue Shopping
                      </span>
                    </div>
                  </a>
                  <a href="#">
                    <div className="w-[140px] h-[50px] bg-[#F6F6F6] flex justify-center items-center">
                      <span className="text-sm font-semibold">Update Cart</span>
                    </div>
                  </a>
                </div>
              </div>
              <div className="w-full mt-[30px] flex sm:justify-end">
                <div className="sm:w-[370px] w-full border border-[#EDEDED] px-[30px] py-[26px]">
                  <div className="sub-total mb-6">
                    <div className=" flex justify-between mb-6">
                      <p className="text-[15px] font-medium text-qblack">
                        Subtotal
                      </p>
                      <p className="text-[15px] font-medium text-qred">${cartSubtotal}</p>
                    </div>
                    <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                  </div>
                  <div className="shipping mb-6">
                    <span className="text-[15px] font-medium text-qblack mb-[18px] block">
                      Shipping
                    </span>
                    <ul className="flex flex-col space-y-1">
                      <li>
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2.5 items-center">
                            <div className="input-radio">
                              <input
                                type="radio"
                                name="price"
                                className="accent-pink-500"
                              />
                            </div>
                            <span className="text-[13px] text-normal text-qgraytwo">
                              Free Shipping
                            </span>
                          </div>
                          <span className="text-[13px] text-normal text-qgraytwo">
                            +$00.00
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2.5 items-center">
                            <div className="input-radio">
                              <input
                                type="radio"
                                name="price"
                                className="accent-pink-500"
                              />
                            </div>
                            <span className="text-[13px] text-normal text-qgraytwo">
                              Flat Rate
                            </span>
                          </div>
                          <span className="text-[13px] text-normal text-qgraytwo">
                            +$00.00
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2.5 items-center">
                            <div className="input-radio">
                              <input
                                type="radio"
                                name="price"
                                className="accent-pink-500"
                              />
                            </div>
                            <span className="text-[13px] text-normal text-qgraytwo">
                              Local Delivery
                            </span>
                          </div>
                          <span className="text-[13px] text-normal text-qgraytwo">
                            +$00.00
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="shipping-calculation w-full mb-3">
                    <div className="title mb-[17px]">
                      <h1 className="text-[15px] font-medium">
                        Calculate Shipping
                      </h1>
                    </div>
                    <div className="w-full h-[50px] border border-[#EDEDED] px-5 flex justify-between items-center mb-2">
                      <span className="text-[13px] text-qgraytwo">
                        Select Country
                      </span>
                      <span>
                        <svg
                          width="11"
                          height="7"
                          viewBox="0 0 11 7"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.4 6.8L0 1.4L1.4 0L5.4 4L9.4 0L10.8 1.4L5.4 6.8Z"
                            fill="#222222"
                          />
                        </svg>
                      </span>
                    </div>
                    <div className="w-full h-[50px]">
                      <InputCom
                        inputClasses="w-full h-full"
                        type="text"
                        placeholder="Postcode / ZIP"
                      />
                    </div>
                  </div>
                  <button type="button" className="w-full mb-10">
                    <div className="w-full h-[50px] bg-[#F6F6F6] flex justify-center items-center">
                      <span className="text-sm font-semibold">Update Cart</span>
                    </div>
                  </button>
                  <div className="total mb-6">
                    <div className=" flex justify-between">
                      <p className="text-[18px] font-medium text-qblack">
                        Total
                      </p>
                      <p className="text-[18px] font-medium text-qred">${oderTotal.toFixed(2)}</p>
                    </div>
                  </div>
                  <a href="/checkout">
                    <div className="w-full h-[50px] black-btn flex justify-center items-center">
                      <span className="text-sm font-semibold">
                        Proceed to Checkout
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CartPage;
