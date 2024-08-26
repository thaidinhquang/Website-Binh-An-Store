import { Link } from "react-router-dom";
import Cart from "../Cart/Cart";
import Compair from "../icons/Compair";
import ThinBag from "../icons/ThinBag";
import ThinLove from "../icons/ThinLove";
import ThinPeople from "../icons/ThinPeople";
import { useContext } from "react";
import AuthenticationModal from "./AuthenticationModal";
import { AuthContext } from "../Auth/core/Auth";
import { useTanstackQuery } from "../../common/hooks/useTanstackQuery";
import ThinLove1 from "../icons/ThinLove1";
import SearchBox from "../SearchBox";

const Middlebar = ({ className }) => {
  const { currentUser, isLogin } = useContext(AuthContext);
  const { data: cartCount } = useTanstackQuery("cart/count", {}, true, isLogin);
  const { data: wishlistCount } = useTanstackQuery("wishlist/count", {}, true, isLogin);
  return (
    <div>
      <div className={`w-full h-[86px] bg-white ${className}`}>
        <div className="container-x mx-auto h-full">
          <div className="relative h-full">
            <div className="flex justify-between items-center h-full">
              <div>
                <Link to={"/"}>
                  <img className="w-40" src="/assets/images/logo.png" alt="" />
                </Link>
              </div>
              <div className={`w-[517px] h-[44px]`}>
                <SearchBox className={``} type={1} />
              </div>
              {currentUser ? (
                <div className="flex space-x-6 items-center">
                  <div className="favorite relative">
                    <Link to="/wishlist">
                      <span>
                        <ThinLove1 />
                      </span>
                    </Link>
                    <span className="w-[18px] h-[18px] rounded-full bg-qh4-pink absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] text-qblack">
                      {wishlistCount}
                    </span>
                  </div>
                  <div className="cart-wrapper group relative py-4">
                    <div className="cart relative cursor-pointer">
                      <Link to="/cart">
                        <span>
                          <ThinBag />
                        </span>
                      </Link>
                      <span className="w-[18px] h-[18px] rounded-full bg-qh4-pink absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] text-qblack">
                        {cartCount}
                      </span>
                    </div>
                    {/* <div className="fixed left-0 top-0 w-full h-full z-40"></div> */}
                    {/* hidden group-hover:block" */}
                    <Cart className="absolute -right-[45px] top-11 z-50 hidden group-hover:block" />
                  </div>
                  <div>
                    <Link to="/profile">
                      <span>
                        <ThinPeople />
                      </span>
                    </Link>
                  </div>
                </div>
              ) : (
                <div>
                  <AuthenticationModal />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Middlebar;
