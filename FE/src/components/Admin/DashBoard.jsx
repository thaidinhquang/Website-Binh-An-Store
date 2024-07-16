import { Link, Outlet } from "react-router-dom";
import IcoDashboard from "../icons/IcoDashboard";
import IcoPeople from "../icons/IcoPeople";

import IcoCart from "../icons/IcoCart";
import IcoLove from "../icons/IcoLove";
import Product from "../icons/Product";
import IcoCategory from "../icons/IcoCategory";

const DashBoard = () => {
  return (
    <div>
      <div className="profile-page-wrapper w-full">
        <div className="">
          <div className="">
            <div className="w-full bg-white px-10 py-9">
              <div className="title-area w-full flex justify-between items-center fixed">
                <h1 className="text-[22px] font-bold text-qblack text-[#706e6e] italic">
                  Bình An Store
                </h1>
              </div>
              <div className="profile-wrapper w-full flex space-x-10 mt-[3.5rem]">
                <div className="w-[236px] min-h-[600px] border-r border-[rgba(0, 0, 0, 0.1)] ">
                  <div className="flex flex-col space-y-10 fixed h-screen overflow-y-auto no-scrollbar">
                    <div className="item group">
                      <Link to="/admin">
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span>
                            <IcoDashboard />
                          </span>
                          <span className=" font-normal text-base">
                            Dashboard
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="item group">
                      <Link to="/admin/categories">
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span>
                            <IcoCategory />
                          </span>
                          <span className=" font-normal text-base">
                            Danh mục
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="item group">
                      <Link to="/admin/products">
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span>
                            <Product />
                          </span>
                          <span className=" font-normal text-base">
                            Sản phẩm
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="item group">
                      <Link to="/admin/users">
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span>
                            <IcoPeople />
                          </span>
                          <span className=" font-normal text-base">
                            Người dùng
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="item group">
                      <Link to="/admin/orders">
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span>
                            <IcoCart />
                          </span>
                          <span className=" font-normal text-base">
                            Đơn hàng
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="item group">
                      <Link to="/">
                        <div className="flex space-x-3 items-center text-green-500 hover:text-qblack">
                          <span>
                            <IcoLove />
                          </span>
                          <span className=" font-normal text-base">
                            Website
                          </span>
                        </div>
                      </Link>
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

export default DashBoard;
