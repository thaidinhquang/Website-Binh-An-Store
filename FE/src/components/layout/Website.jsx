import { useState } from "react";
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import { Outlet } from "react-router-dom";
import DiscountBanner from "../Home/DiscountBanner";

const LayoutWebsite = ({ children, childrenClasses}) => {
    const [drawer, setDrawer] = useState(false);
  return (
    <div>
    <div className="w-full overflow-x-hidden bg-[#e5e7eb]">
    <Header type={4} drawerAction={() => setDrawer(!drawer)} />
    <div className={`w-full  ${childrenClasses || "pt-[30px]"}`}>
      {children && children}
    </div>
    <Outlet/>
    <DiscountBanner type={3}/>
    <Footer />
  </div>
    </div>
  )
}

export default LayoutWebsite
