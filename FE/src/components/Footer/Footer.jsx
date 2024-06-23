import { Link } from "react-router-dom"
import Instagram from "../icons/Instagram"
import Facebook from "../icons/Facebook"
import Youtube from "../icons/Youtube"

const Footer = () => {
  return (
    <footer className="footer-section-wrapper bg-white print:hidden">
    <div className="container-x block mx-auto pt-[56px]">
      <div className="w-full flex flex-col items-center mb-[50px]">
        {/* logo area */}
        <div className="mb-[40px]">
          
            <Link to="/">
             <h1>Bình An Store</h1>
            </Link>
         
          
        
        </div>
        <div className="w-full h-[1px] bg-[#E9E9E9]"></div>
      </div>
      <div className="lg:flex justify-between mb-[50px]">
        <div className="lg:w-[424px]  ml-0 w-full mb-10 lg:mb-0">
          <h1 className="text-[18] font-500 text-[#2F2F2F] mb-5">About Us</h1>
          <p className="text-[#9A9A9A] text-[15px] w-[247px] leading-[28px]">
            We know there are a lot of threa developers our but we pride into
            a firm in the industry.
          </p>
        </div>
        <div className="flex-1 lg:flex">
          <div className="lg:w-1/3 w-full mb-10 lg:mb-0">
            <div className="mb-5">
              <h6 className="text-[18] font-500 text-[#2F2F2F]">Feature</h6>
            </div>
            <div>
              <ul className="flex flex-col space-y-4 ">
                <li>
                  <Link to="/about">
                    <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                      About Us
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/terms-condition">
                    <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                      Terms Condition
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/all-products">
                    <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                      Best Products
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="lg:w-1/3 lg:flex lg:flex-col items-center w-full mb-10 lg:mb-0 ">
            <div>
              <div className="mb-5">
                <h6 className="text-[18] font-500 text-[#2F2F2F]">
                  General Links
                </h6>
              </div>
              <div>
                <ul className="flex flex-col space-y-4 ">
                  <li>
                    <Link to="/blogs">
                      <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                        Blog
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/tracking-order">
                      <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                        Tracking Order
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/become-saller">
                      <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                        Become Seller
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 lg:flex lg:flex-col items-center w-full mb-10 lg:mb-0">
            <div>
              <div className="mb-5">
                <h6 className="text-[18] font-500 text-[#2F2F2F]">Helpful</h6>
              </div>
              <div>
                <ul className="flex flex-col space-y-4 ">
                  <li>
                    <Link to="/flash-sale">
                      <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                        Flash Sale
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq">
                      <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                        FAQ
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/about">
                      <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                        Support
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-bar border-t border-qgray-border lg:h-[82px] lg:flex justify-between items-center">
        <div className="flex lg:space-x-5 justify-between items-center mb-3">
          <div className="flex space-x-5 items-center">
            <Link to="#">
              <Instagram className="fill-current text-qgray hover:text-qblack" />
            </Link>
            <Link to="#">
              <Facebook className="fill-current text-qgray hover:text-qblack" />
            </Link>
            <Link to="#">
              <Youtube className="fill-current text-qgray hover:text-qblack" />
            </Link>
          </div>
          <span className="sm:text-base text-[10px] text-qgray font-300">
            ©2024
           
            All rights reserved
          </span>
        </div>
        <div className="">
          <Link to="#">
            <img
              width="318"
              height="28"
              src={`/assets/images/payment-getways.png`}
              alt="payment-getways"
            />
          </Link>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer