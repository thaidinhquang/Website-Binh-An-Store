import { useEffect, useState } from "react";

const CartPage = () => {
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

  // const cartSubtotal = cartItems.reduce((total, item) => {
  //   return total + calculateTotalPrice(item);
  // }, 0);

  // const oderTotal = cartSubtotal;

  return (
    <div>
    <h2>Cart-Page</h2>
    <div className="relative w-full overflow-x-auto border border-[#EDEDED]">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead>
          <tr>
            <th className="py-4 whitespace-nowrap text-center">ID</th>
            <td className="py-4 pl-10 block whitespace-nowrap min-w-[300px]">
              Product
            </td>
            <th className="py-4 whitespace-nowrap text-center">Price</th>
            <th className="py-4 whitespace-nowrap text-center">Quantity</th>
            <th className="py-4 whitespace-nowrap text-center">Total</th>
            <th className="py-4 whitespace-nowrap text-center">Edit</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index} className="bg-white border-b hover:bg-gray-50">
              <td className="text-center py-4 px-2">
                <div className="flex space-x-1 items-center justify-center">
                  <span className="text-[15px] font-normal">{index + 1}</span>
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
                  <span className="text-[15px] font-normal">{item.price}</span>
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
    <div></div>
  </div>
  
  );
};

export default CartPage;
