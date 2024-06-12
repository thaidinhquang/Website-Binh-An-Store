import { useState } from "react";
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import { Outlet } from "react-router-dom";

const LayOutHome = ({ children, childrenClasses}) => {
    const [drawer, setDrawer] = useState(false);
  return (
    <div>
    <div className="w-full overflow-x-hidden">
    <Header type={4} drawerAction={() => setDrawer(!drawer)} />
    <div className={`w-full  ${childrenClasses || "pt-[30px]"}`}>
      {children && children}
    </div>
    <Outlet/>
    <Footer />
  </div>
    </div>
  )
}

export default LayOutHome
