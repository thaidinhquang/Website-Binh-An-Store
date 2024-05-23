import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import IcoAdress from "./icons_admin/IcoAdress";
import IcoCart from "./icons_admin/IcoCart";
import IcoDashboard from "./icons_admin/IcoDashboard";
import IcoLogout from "./icons_admin/IcoLogout";
import IcoLove from "./icons_admin/IcoLove";
import IcoPassword from "./icons_admin/IcoPassword";
import IcoPayment from "./icons_admin/IcoPayment";
import IcoPeople from "./icons_admin/IcoPeople";
import IcoReviewHand from "./icons_admin/IcoReviewHand";
import IcoSupport from "./icons_admin/IcoSupport";
import Dashboard from './Tabs/Dasbord';

const HeaderAdmin = () => {
    const location = useLocation();
    const getHashContent = location.hash.split("#");
    const [active, setActive] = useState("dashboard");
    useEffect(() => {
        setActive(
            getHashContent && getHashContent.length > 1
                ? getHashContent[1]
                : "dashboard"
        );
    }, [getHashContent]);
    return (
        <div>
            <div className="w-full bg-white px-10 py-2">
                <div className="">

                    <img className='' width={140} src={`/assets/images/Logo.png`} alt="" />


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
                                <Link to="/profile#profile">
                                    <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                                        <span>
                                            <IcoPeople />
                                        </span>
                                        <span className=" font-normal text-base">
                                            Parsonal Info
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
                        <div className="item-body dashboard-wrapper w-full">
                            {active === "dashboard" ? (
                                <Dashboard />
                                // ) : active === "profile" ? (
                                //     <>
                                //         <ProfileTab />
                                //     </>
                                // ) : active === "payment" ? (
                                //     <>
                                //         <Payment />
                                //     </>
                                // ) : active === "order" ? (
                                //     <>
                                //         <OrderTab />
                                //     </>
                                // ) : active === "wishlist" ? (
                                //     <>
                                //         <WishlistTab />
                                //     </>
                                // ) : active === "address" ? (
                                //     <>
                                //         <AddressesTab />
                                //     </>
                                // ) : active === "password" ? (
                                //     <>
                                //         <PasswordTab />
                                //     </>
                                // ) : active === "support" ? (
                                //     <>
                                //         <SupportTab />
                                //     </>
                                // ) : active === "review" ? (
                                //     <>
                                //         <ReviewTab products={datas.products} />
                                //     </>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderAdmin