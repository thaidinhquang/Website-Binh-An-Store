import { Link } from "react-router-dom";
import { useTanstackQuery, useTanstackMutation } from "../../common/hooks/useTanstackQuery";
import BreadcrumbCom from "../UI/BreadcrumbCom";
import PageTitle from "../UI/PageTitle";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/core/Auth";


const CartPage = ({ cart = true, className }) => {
  const [isLoadingItem, setIsLoadingItem] = useState(false)
  const [items, setItems] = useState([])
  const { data, isLoading } = useTanstackQuery('cart')
  const { data: cartTotal, isLoading: isLoadingCartTotal, refetch} = useTanstackQuery('cart/total')
  const { mutate: increeseProduct } = useTanstackMutation(`cart/increase-quantity`, "CREATE");
  const { mutate: decreaseProduct } = useTanstackMutation(`cart/decrease-quantity`, "CREATE");
  const { mutate: removeProduct } = useTanstackMutation(`cart/remove-item`, "CREATE");
  const { mutate: order, isPending, data: response } = useTanstackMutation(`orders/create-checkout-session`, "CREATE");
  const { currentUser } = useContext(AuthContext);
  const calculateTotalPrice = (item) => {
    return item.productId.price * item.quantity;
  };
  const updateProduct = (product, action) => {
    const productId = product.productId._id
    const quantity = data.products.find(item => item.productId._id === productId).quantity
    if (action === 'increase') {
      increeseProduct({ productId })
      data.products.find(item => item.productId._id === productId).quantity++
    }
    if (action === 'decrease') {
      if (quantity > 1) {
        decreaseProduct({ productId })
        data.products.find(item => item.productId._id === productId).quantity--
      }
    }
    if (action === 'remove') {
      removeProduct({ productId })
      data.products = data.products.filter(item => item.productId._id !== productId)
    }
    setTimeout(() => {
      refetch()
    }, 1000)
  };
  const onSubmit = async () => {
    const data = {
      userId: currentUser._id,
      items: items,
      "currency": "usd",
    }
    order(data)
  }
  useEffect(() => {
    if (response) {
      window.location.replace(response.sessionUrl)
    }
  }, [response])
  useEffect(() => {
    if (data?.products?.length > 0) {
      setIsLoadingItem(true)
      let listItem = []
      data.products.forEach(item => {
        listItem.push({
          name: item.productId._id,
          image: item.productId.image,
          price: item.productId.price,
          quantity: item.quantity
        })
      })
      setItems(listItem)
      setIsLoadingItem(false)
    }
  }, [data])
  if (isLoading) return <p>Loading...</p>
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

                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {!data.products.length ?
                          <tr>
                            <td colSpan="6" className="text-center py-4">No product in cart</td>
                          </tr>
                          :
                          data.products.map((item, index) => (
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
                                      src={item.productId.image}
                                      alt="product"
                                      className="w-full h-full object-contain"
                                    />
                                  </div>
                                  <div className="flex-1 flex flex-col">
                                    <p className="font-medium text-[15px] text-qblack">
                                      {item.productId.name}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td className="text-center py-4 px-2">
                                <div className="flex space-x-1 items-center justify-center">
                                  <span className="text-[15px] font-normal">
                                    {item.productId.price}
                                  </span>
                                </div>
                              </td>

                              <td className="py-4">
                                <div className="flex justify-center items-center space-x-2">
                                  <button
                                    disabled={item.quantity === 1}
                                    onClick={() => updateProduct(item, 'decrease')}
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
                                    onClick={() => updateProduct(item, 'increase')}
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
                                  <span onClick={() => updateProduct(item, 'remove')}>
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
              <div className="w-full mt-[30px] flex sm:justify-end">
                <div className="sm:w-[370px] w-full border border-[#EDEDED] px-[30px] py-[26px]">
                  {/* <div className="sub-total mb-6">
                    <div className=" flex justify-between mb-6">
                      <p className="text-[15px] font-medium text-qblack">
                        Subtotal
                      </p>
                      <p className="text-[15px] font-medium text-qred">$subtotal</p>
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
                  </button> */}
                  <div className="total mb-6">
                    <div className=" flex justify-between">
                      <p className="text-[18px] font-medium text-qblack">
                        Total
                      </p>
                      <p className="text-[18px] font-medium text-qred">${!isLoadingCartTotal && cartTotal}</p>
                    </div>
                  </div>
                  <button onClick={() => onSubmit()} disabled={isLoadingItem} className="w-full h-[50px] black-btn flex justify-center items-center text-sm font-semibold">
                    {isPending ? "Processing..." : "Thanh Toán online"}
                  </button>
                  <Link to="/checkout">
                    <div className="mt-4 w-full h-[50px] black-btn flex justify-center items-center">
                      <span className="text-sm font-semibold">
                        Trả tiền khi nhận hàng
                      </span>
                    </div>
                  </Link>
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
