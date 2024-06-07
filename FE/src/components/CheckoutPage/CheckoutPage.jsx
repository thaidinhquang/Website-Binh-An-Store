import { useEffect, useState } from "react";

import PageTitle from "../UI/PageTitle";

const CheckoutPage = () => {
  const [cartSubtotal, setCartSubtotal] = useState(0);

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
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
