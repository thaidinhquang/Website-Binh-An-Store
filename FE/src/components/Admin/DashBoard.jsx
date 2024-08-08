import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import IcoDashboard from "../icons/IcoDashboard";
import IcoPeople from "../icons/IcoPeople";
import IcoCart from "../icons/IcoCart";
import IcoLove from "../icons/IcoLove";
import Product from "../icons/Product";
import IcoCategory from "../icons/IcoCategory";
import { faComment, faFlag, faLayerGroup, faList, faRectangleAd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashBoard = () => {
  const location = useLocation();
  const [hoveredLink, setHoveredLink] = useState("");
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-10 py-4 px-6">
        <h1 className="text-[22px] font-bold text-qblack italic">Bình An Store</h1>
      </div>
      
      {/* Main content */}
      <div className="flex mt-[3.5rem]">
        {/* Sidebar */}
        <div className="fixed top-[3.5rem] left-0 w-[236px] min-h-screen border-r border-[rgba(0, 0, 0, 0.1)] bg-white">
          <div className="flex flex-col space-y-4 h-full overflow-y-auto p-4">
            {[
              { to: "/admin", icon: <IcoDashboard />, text: "Quản lý thông kê" },
              { to: "/admin/products", icon: <Product />, text: "Quản lý sản phẩm" }, 
              { to: "/admin/attribute",  icon: <FontAwesomeIcon icon={faList}/>, text: "Quản lý thuộc tính" },
               { to: "/admin/brands", icon: <FontAwesomeIcon icon={faFlag}/>, text: "Quản lý nhãn hàng" },
              { to: "/admin/categories",icon: <FontAwesomeIcon icon={faLayerGroup}/>, text: "Quản lý danh mục" },
              { to: "/admin/users", icon: <IcoPeople />, text: "Quản lý người dùng" },
              { to: "/admin/orders", icon: <IcoCart />, text: "Quản lý đơn hàng" },
             { to: "/admin/review", icon: <FontAwesomeIcon icon={faComment}/>, text: "Quản lý Đánh giá" },
              { to: "/admin/blogs", icon: <FontAwesomeIcon icon={faRectangleAd}/>, text: "Quản lý blogs" },
              { to: "/", icon: <IcoLove />, text: "Website", textColor: "text-green-500" }
            ].map(({ to, icon, text, textColor = "text-qgray" }) => (
              <div
                key={to}
                className={`group item transition-transform duration-300 p-3 ${activeLink === to ? "bg-gray-200" : ""} ${hoveredLink === to && activeLink !== to ? "bg-gray-100 transform scale-105 shadow-lg" : ""}`}
                onMouseEnter={() => setHoveredLink(to)}
                onMouseLeave={() => setHoveredLink("")}
                onClick={() => handleLinkClick(to)}
              >
                <Link to={to}>
                  <button className="flex space-x-3 items-center text-qgray group-hover:text-black">
                    <span>{icon}</span>
                    <span className={`font-normal text-base group-hover:${textColor}`}>{text}</span>
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 ml-[236px] mt-[3.5rem] p-6"> {/* Adjust margin-left and margin-top */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;