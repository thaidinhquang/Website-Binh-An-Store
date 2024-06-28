import React, { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import IcoDashboard from "../icons/IcoDashboard";
import IcoPeople from "../icons/IcoPeople";
import IcoCart from "../icons/IcoCart";
import IcoAdress from "../icons/IcoAdress";
import IcoPassword from "../icons/IcoPassword";
import IcoSupport from "../icons/IcoSupport";
import { AuthContext } from "../Auth/core/Auth";
import '../UI/style.css'
export const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, removeCurrentUser } = useContext(AuthContext);
  const [confirmLogout, setConfirmLogout] = useState(false)
  const handleLogout = () => {
    if(confirmLogout) {
      removeCurrentUser();
      navigate("/?openform=true");
    }
    else {
      setConfirmLogout(true)
      setTimeout(() => {
        setConfirmLogout(false)
      }, 5000);
    }
  }
  return (
    <div>
      <div className="profile-page-wrapper w-full">
        <div className="">
          <div className="">
            <div className="w-full bg-white px-10 py-9">
              <div className="title-area w-full flex justify-between items-center">
                <h1 className="text-[22px] font-bold text-qblack">
                  Your Profile
                </h1>
              </div>
              <div className="profile-wrapper w-full mt-8 flex space-x-10">
                <div className="w-[236px] min-h-[600px] border-r border-[rgba(0, 0, 0, 0.1)]">
                  <div className="flex flex-col space-y-10">
                    {currentUser?.role === "admin" && (<div className="item group">
                      <Link to="/admin">
                        <div className="flex space-x-3 items-center text-qgray hover:text-black">
                          <span>
                            <IcoDashboard />
                          </span>
                          <span className=" font-normal text-base">
                            Dashboard
                          </span>
                        </div>
                      </Link>
                    </div>)}
                    <div className="item group">
                      <Link to="/profile">
                        <div className="flex space-x-3 items-center text-qgray hover:text-black">
                          <span>
                            <IcoPeople />
                          </span>
                          <span className=" font-normal text-base">
                            Tài khoản của tôi
                          </span>
                        </div>
                      </Link>
                    </div>

                    <div className="item group">
                      <Link to="/profile/orders">
                        <div className="flex space-x-3 items-center text-qgray hover:text-black">
                          <span>
                            <IcoCart />
                          </span>
                          <span className=" font-normal text-base">
                            Đơn mua
                          </span>
                        </div>
                      </Link>
                    </div>

                    <div className="item group">
                      <Link to="/profile/address">
                        <div className="flex space-x-3 items-center text-qgray hover:text-black">
                          <span>
                            <IcoAdress />
                          </span>
                          <span className=" font-normal text-base">
                            Địa chỉ
                          </span>
                        </div>
                      </Link>
                    </div>

                    <div className="item group">
                      <Link to="/profile/change-password">
                        <div className="flex space-x-3 items-center text-qgray hover:text-black">
                          <span>
                            <IcoPassword />
                          </span>
                          <span className=" font-normal text-base">
                            Đổi mật khẩu
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="item group">
                      <Link to="/profile#support">
                        <div className="flex space-x-3 items-center text-qgray hover:text-black">
                          <span>
                            <IcoSupport />
                          </span>
                          <span className=" font-normal text-base">
                            Support Voucher
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="item group">
                      <button onClick={() => handleLogout()}
                        className="button-logout"
                      >
                        {confirmLogout ? "Xác nhận" : "Đăng xuất"}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
