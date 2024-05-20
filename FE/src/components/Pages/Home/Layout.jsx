import { useState } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
export default function LayoutHome({ children, childrenClasses}) {
  const [drawer, setDrawer] = useState(false);
  return (
    <>
      
      <div className="w-full overflow-x-hidden">
        <Header type={4} drawerAction={() => setDrawer(!drawer)} />
        <div className={`w-full  ${childrenClasses || "pt-[30px] pb-[60px]"}`}>
          {children && children}
        </div>
        <Footer />
      </div>
    </>
  );
}
