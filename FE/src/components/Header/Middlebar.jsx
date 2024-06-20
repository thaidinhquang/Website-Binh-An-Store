import { Link } from 'react-router-dom'
import Cart from '../Cart/Cart'
import SearchBox from './SearchBox'
import Compair from '../icons/Compair'
import ThinBag from '../icons/ThinBag'
import ThinLove from '../icons/ThinLove'
import ThinPeople from '../icons/ThinPeople'
import { useContext, useEffect } from "react";
import AuthenticationModal from './AuthenticationModal'
import { AuthContext } from '../Auth/core/Auth'

const Middlebar = ({ className }) => {
  const { currentUser, removeCurrentUser } = useContext(AuthContext);
  useEffect(() => {
    console.log(currentUser);
  }, [currentUser])
  const logout = () => {
    removeCurrentUser()
  }
  return (
    <div>
      <div className={`w-full h-[86px] bg-white ${className}`}>
        <div className="container-x mx-auto h-full">
          <div className="relative h-full">
            <div className="flex justify-between items-center h-full">
              <div>
                <a href="">
                  <span className="text-lg font-semibold ml-2 text-gray-800">Bình An</span>
                </a>
              </div>
              <div className="w-[517px] h-[44px]">
                <SearchBox className="search-com" />
              </div>
              {currentUser ?
                <div className="flex space-x-6 items-center">
                  <div className="logout relative">
                    <button onClick={() => logout()}>Log out</button>
                  </div>
                  <div className="compaire relative">
                    <a href="/products-compaire">
                      <span>
                        <Compair />
                      </span>
                    </a>
                    <span className="w-[18px] h-[18px] rounded-full bg-qh4-pink absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] text-qblack">
                      2
                    </span>
                  </div>
                  <div className="favorite relative">
                    <a href="/wishlist">
                      <span>
                        <ThinLove />
                      </span>
                    </a>
                    <span className="w-[18px] h-[18px] rounded-full bg-qh4-pink absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] text-qblack">
                      1
                    </span>
                  </div>
                  <div className="cart-wrapper group relative py-4">
                    <div className="cart relative cursor-pointer">
                      <a href="/cart">
                        <span>
                          <ThinBag />
                        </span>
                      </a>
                      <span className="w-[18px] h-[18px] rounded-full bg-qh4-pink absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] text-qblack">
                        15
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
                :
                <div>
                  <AuthenticationModal />
                </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Middlebar
