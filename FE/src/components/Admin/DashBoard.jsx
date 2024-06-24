
import { Link, Outlet } from 'react-router-dom'
import IcoDashboard from '../icons/IcoDashboard'
import IcoPeople from '../icons/IcoPeople'
import IcoPayment from '../icons/IcoPayment'
import IcoCart from '../icons/IcoCart'
import IcoLove from '../icons/IcoLove'
import IcoAdress from '../icons/IcoAdress'
import IcoReviewHand from '../icons/IcoReviewHand'
import IcoPassword from '../icons/IcoPassword'
import IcoSupport from '../icons/IcoSupport'
import IcoLogout from '../icons/IcoLogout'
import Product from '../icons/Product'
import IcoCategory from '../icons/IcoCategory'

const DashBoard = () => {
  return (
    <div>
    <div className="profile-page-wrapper w-full">
    <div className="">
      <div className="">
      
        <div className="w-full bg-white px-10 py-9">
          <div className="title-area w-full flex justify-between items-center">
            <h1 className="text-[22px] font-bold text-qblack">
              Your Dashboard
            </h1>

          </div>
          <div className="profile-wrapper w-full mt-8 flex space-x-10">
            <div className="w-[236px] min-h-[600px] border-r border-[rgba(0, 0, 0, 0.1)]">
              <div className="flex flex-col space-y-10">
                <div className="item group">
                  <Link to="/profile#dashboard">
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
                  <Link to="/profile#payment">
                    <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                      <span>
                        <IcoPayment />
                      </span>
                      <span className=" font-normal text-base">
                        Payment Method
                      </span>
                    </div>
                  </Link>
                </div>
                <div className="item group">
                  <Link to="/profile#order">
                    <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                      <span>
                        <IcoCart />
                      </span>
                      <span className=" font-normal text-base">Order</span>
                    </div>
                  </Link>
                </div>
                <div className="item group">
                  <Link to="/profile#wishlist">
                    <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                      <span>
                        <IcoLove />
                      </span>
                      <span className=" font-normal text-base">
                        Wishlist
                      </span>
                    </div>
                  </Link>
                </div>
                <div className="item group">
                  <Link to="/profile#address">
                    <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                      <span>
                        <IcoAdress />
                      </span>
                      <span className=" font-normal text-base">
                        Address
                      </span>
                    </div>
                  </Link>
                </div>
                <div className="item group">
                  <Link to="/profile#review">
                    <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                      <span>
                        <IcoReviewHand />
                      </span>
                      <span className=" font-normal text-base">
                        Reviews
                      </span>
                    </div>
                  </Link>
                </div>
                <div className="item group">
                  <Link to="/profile#password">
                    <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                      <span>
                        <IcoPassword />
                      </span>
                      <span className=" font-normal text-base">
                        Change Password
                      </span>
                    </div>
                  </Link>
                </div>
                <div className="item group">
                  <Link to="/profile#support">
                    <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                      <span>
                        <IcoSupport />
                      </span>
                      <span className=" font-normal text-base">
                        Support Ticket
                      </span>
                    </div>
                  </Link>
                </div>
                <div className="item group">
                  <Link to="/profile#profile">
                    <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                      <span>
                        <IcoLogout />
                      </span>
                      <span className=" font-normal text-base">
                        Logoout
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex-1">
            <Outlet/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
  )
}

export default DashBoard
