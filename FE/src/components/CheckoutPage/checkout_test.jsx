import { useEffect, useState } from "react";

import PageTitle from "../UI/PageTitle";

const CheckoutPage = () => {
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [cartItems, setcartItems] = useState([]);


  useEffect(() => {
    // lay du lieu trong localStorage
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setcartItems(storedCartItems);
  }, []);


  useEffect(() => {
    const storedSubtotal = localStorage.getItem("cartSubtotal");
    if (storedSubtotal) {
      setCartSubtotal(parseFloat(storedSubtotal));
    }
  }, []);

  return (
    <div className="checkout-page-wrapper w-full bg-white pb-[60px]">
      <div className="w-full">
        <PageTitle
          title="Checkout"
          breadcrumb={[
            { name: "home", path: "/" },
            { name: "checkout", path: "/checkout" },
          ]}
        />
      </div>
      <div className="w-full mt-[23px]">
        <div className="container-x mx-auto">
          <div className="checkout-summary border border-[#EDEDED] p-[30px]">
            <h2 className="text-[18px] font-medium">Order Summary</h2>
            <div className="subtotal flex justify-between mt-[15px]">
              <span className="text-[15px] font-medium">Subtotal</span>
              <span className="text-[15px] font-medium text-qred">${cartSubtotal.toFixed(2)}</span>
              
            </div>
            {/* Add additional checkout information here, e.g., shipping cost, total, etc. */}
            <div className="total flex justify-between mt-[15px]">
              <span className="text-[18px] font-medium">Total</span>
              <span className="text-[18px] font-medium text-qred">${cartSubtotal.toFixed(2)}</span>
            </div>
            <button type="button" className="w-full mt-[30px] black-btn">
              <span className="text-sm font-semibold">Proceed to Payment</span>
            </button>
          </div>
    
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
              
                    <input
                      type="text"
                      value={item.quantity}
                      readOnly
                      className="w-12 text-center border border-gray-300 rounded"
                    />
                  
                  </div>
                </td>

                <td className="text-right py-4">
                  <div className="flex space-x-1 items-center justify-center">
                    
                  </div>
                </td>

                <td className="text-right py-4">
                  <div className="flex space-x-1 items-center justify-center">
                    
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
