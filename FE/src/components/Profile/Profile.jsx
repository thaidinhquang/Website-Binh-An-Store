import { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import IcoDashboard from "../icons/IcoDashboard";
import IcoPeople from "../icons/IcoPeople";
import IcoCart from "../icons/IcoCart";
import IcoAdress from "../icons/IcoAdress";
import IcoPassword from "../icons/IcoPassword";
import IcoSupport from "../icons/IcoSupport";
import { AuthContext } from "../Auth/core/Auth";

export const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, removeCurrentUser } = useContext(AuthContext);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [hoveredLink, setHoveredLink] = useState("");
  const [activeLink, setActiveLink] = useState("");

  const handleLogout = () => {
    if (confirmLogout) {
      removeCurrentUser();
      navigate("/?openform=true");
    } else {
      setConfirmLogout(true);
      setTimeout(() => {
        setConfirmLogout(false);
      }, 5000);
    }
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    navigate(link); // Navigate to the clicked link
  };

  return (
    <div className="profile-page-wrapper w-full">
      <div className="w-full bg-white px-10 py-9">
        <div className="title-area w-full flex justify-between items-center">
          <h1 className="text-[22px] font-bold text-qblack">Your Profile</h1>
        </div>
        <div className="profile-wrapper w-full mt-8 flex">
          {/* Sidebar */}
          <div className="w-[236px] min-h-[600px] border-r border-[rgba(0, 0, 0, 0.1)] flex-shrink-0 bg-white">
            <div className="flex flex-col space-y-4">
              {currentUser?.role === "admin" && (
                <div
                  className={`item group transition-transform duration-300 ${
                    activeLink === "/admin" ? "bg-gray-200" : ""
                  } ${
                    hoveredLink === "/admin" && activeLink !== "/admin"
                      ? "bg-gray-100 transform scale-105 shadow-lg"
                      : ""
                  } p-3`}
                  onMouseEnter={() => setHoveredLink("/admin")}
                  onMouseLeave={() => setHoveredLink("")}
                  onClick={() => handleLinkClick("/admin")}
                >
                  <Link to="/admin">
                    <div className="flex space-x-3 items-center text-qgray hover:text-black">
                      <span>
                        <IcoDashboard />
                      </span>
                      <span className="font-normal text-base text-red-500">
                        Admin Dashboard
                      </span>
                    </div>
                  </Link>
                </div>
              )}
              <div
                className={`item group transition-transform duration-300 ${
                  activeLink === "/profile" ? "bg-gray-200" : ""
                } ${
                  hoveredLink === "/profile" && activeLink !== "/profile"
                    ? "bg-gray-100 transform scale-105 shadow-lg"
                    : ""
                } p-3`}
                onMouseEnter={() => setHoveredLink("/profile")}
                onMouseLeave={() => setHoveredLink("")}
                onClick={() => handleLinkClick("/profile")}
              >
                <Link to="/profile">
                  <div className="flex space-x-3 items-center text-qgray hover:text-black">
                    <span>
                      <IcoPeople />
                    </span>
                    <span className="font-normal text-base">
                      Tài khoản của tôi
                    </span>
                  </div>
                </Link>
              </div>
              <div
                className={`item group transition-transform duration-300 ${
                  activeLink === "/profile/orders" ? "bg-gray-200" : ""
                } ${
                  hoveredLink === "/profile/orders" &&
                  activeLink !== "/profile/orders"
                    ? "bg-gray-100 transform scale-105 shadow-lg"
                    : ""
                } p-3`}
                onMouseEnter={() => setHoveredLink("/profile/orders")}
                onMouseLeave={() => setHoveredLink("")}
                onClick={() => handleLinkClick("/profile/orders")}
              >
                <Link to="/profile/orders">
                  <div className="flex space-x-3 items-center text-qgray hover:text-black">
                    <span>
                      <IcoCart />
                    </span>
                    <span className="font-normal text-base">Đơn mua</span>
                  </div>
                </Link>
              </div>

              <div
                className={`item group transition-transform duration-300 ${
                  activeLink === "/profile/change-password" ? "bg-gray-200" : ""
                } ${
                  hoveredLink === "/profile/change-password" &&
                  activeLink !== "/profile/change-password"
                    ? "bg-gray-100 transform scale-105 shadow-lg"
                    : ""
                } p-3`}
                onMouseEnter={() => setHoveredLink("/profile/change-password")}
                onMouseLeave={() => setHoveredLink("")}
                onClick={() => handleLinkClick("/profile/change-password")}
              >
                <Link to="/profile/change-password">
                  <div className="flex space-x-3 items-center text-qgray hover:text-black">
                    <span>
                      <IcoPassword />
                    </span>
                    <span className="font-normal text-base">Đổi mật khẩu</span>
                  </div>
                </Link>
              </div>

              <div className="item group">
              <span
                  onClick={() => handleLogout()}
                  className="cursor-pointer inline-block py-2 px-4 border border-gray-300 rounded-md bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md"
              
                >
                  {confirmLogout ? "Xác nhận" : "Đăng xuất"}
                </span>
              </div>
            </div>
          </div>
          {/* Content Area */}
          <div className="flex-1 p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
