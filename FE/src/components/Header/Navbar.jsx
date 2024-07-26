import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTanstackQuery } from '../../common/hooks/useTanstackQuery';
import Arrow from '../icons/Arrow';

const Navbar = ({ className }) => {
  const [categoryToggle, setToggle] = useState(false);
  const [elementsSize, setSize] = useState("0px");
  // const getItems = document.querySelectorAll(`.categories-list li`).length;
  // if (categoryToggle && getItems > 0) {
  //   setSize(`${40 * getItems}px`);
  // }

  const { data} = useTanstackQuery('categories')
  const categories = data?.docs || [];
  
  const handler = () => {
    setToggle(!categoryToggle);
  };
  useEffect(() => {
    if (categoryToggle) {
      const getItems = document.querySelectorAll(`.categories-list li`).length;
      if (categoryToggle && getItems > 0) {
        setSize(`${42 * getItems}px`);
      }
    } else {
      setSize(`0px`);
    }
  }, [categoryToggle]);

  return (
    <div>
      <div
        className={`nav-widget-wrapper w-full bg-orange-400 h-[60px] relative z-30  ${className || ""
          }`}
      >
        <div className="container-x mx-auto h-full">
          <div className="w-full h-full relative">
            <div className="w-full h-full flex justify-between items-center">
              <div className="category-and-nav flex xl:space-x-7 space-x-3 items-center">
                <div className="category w-[270px] h-[53px] bg-white px-5 rounded-t-md mt-[6px] relative">
                  <button
                    onClick={handler}
                    type="button"
                    className="w-full h-full flex justify-between items-center"
                  >
                    <div className="flex space-x-3 items-center">
                      <span className="text-qblack">
                        <svg
                          className="fill-current"
                          width="14"
                          height="9"
                          viewBox="0 0 14 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="14" height="1" />
                          <rect y="8" width="14" height="1" />
                          <rect y="4" width="10" height="1" />
                        </svg>
                      </span>
                      <span className="text-sm font-600 text-qblacktext">
                        All Categories
                      </span>
                    </div>
                    <div>
                      <Arrow
                        width="5.78538"
                        height="1.28564"
                        className="fill-current text-qblacktext"
                      />
                    </div>
                  </button>
                  {categoryToggle && (
                    <div
                      className="fixed top-0 left-0 w-full h-full -z-10"
                      onClick={handler}
                    ></div>
                  )}
                  <div
                    className="category-dropdown w-full absolute left-0 top-[53px] overflow-hidden"
                    style={{ height: `${elementsSize} ` }}
                  >
                    <ul className="categories-list">
                      {categories.map((category) => (

                      <li key={category._id} className="category-item">
                        <Link to={`/shop`}>
                          <div className=" flex justify-between items-center px-5 h-10 bg-white hover:bg-qh2-green transition-all duration-300 ease-in-out cursor-pointer text-qblack hover:text-white">
                            <div className="flex items-center space-x-6">
                              <span>
                                <svg
                                  className="fill-current"
                                  width="12"
                                  height="16"
                                  viewBox="0 0 12 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M0.911344 0.0514231C0.633547 0.132053 0.157324 0.565442 0.0722839 0.822452C-0.0240946 1.12481 -0.0240946 14.8132 0.0722839 15.1156C0.162993 15.3928 0.633547 15.811 0.94536 15.8917C1.10977 15.932 1.72773 15.9521 2.94663 15.9521H4.71546L4.85152 15.8262C5.03861 15.6649 5.03861 15.4331 4.85152 15.2718L4.71546 15.1458H2.9523H1.18914L1.05308 15.0199L0.911344 14.8989V8.85526V1.03914L1.05308 0.9182L1.18914 0.792214H5.90035H10.6116L10.7476 0.9182L10.8894 1.03914V8.85526V14.8989L10.7476 15.0199L10.6116 15.1458H8.8484H7.08524L6.94917 15.2718C6.76208 15.4331 6.76208 15.6649 6.94917 15.8262L7.08524 15.9521H8.85406C10.073 15.9521 10.6909 15.932 10.8553 15.8917C11.1842 15.806 11.6377 15.3877 11.7284 15.0955C11.7851 14.9191 11.7964 14.8673 11.7851 8.72423L11.7681 0.807333L11.598 0.560402C11.4903 0.409221 11.3202 0.258039 11.1501 0.16229L10.8723 0.0111084L5.99106 0.00102901C2.53844 -0.0040102 1.05308 0.0111074 0.911344 0.0514231Z" />
                                  <path d="M1.96009 1.72447C1.86938 1.80006 1.81836 1.90588 1.81836 2.00163C1.81836 2.09738 1.86938 2.20321 1.96009 2.2788C2.09049 2.39975 2.13584 2.40479 2.72545 2.40479C3.31506 2.40479 3.36042 2.39975 3.49081 2.2788C3.58152 2.20321 3.63254 2.09738 3.63254 2.00163C3.63254 1.90588 3.58152 1.80006 3.49081 1.72447C3.36042 1.60352 3.31506 1.59848 2.72545 1.59848C2.13584 1.59848 2.09049 1.60352 1.96009 1.72447Z" />
                                  <path d="M8.16214 1.66399C7.83899 1.76981 7.61221 1.93611 7.4478 2.19312C7.31174 2.3947 7.28906 2.48541 7.28906 2.81297C7.28906 3.15061 7.31174 3.22116 7.45914 3.44289C7.56686 3.59407 7.73694 3.74526 7.90702 3.84101C8.15647 3.97707 8.23584 3.99219 8.62135 3.99219C9.00687 3.99219 9.08624 3.97707 9.33569 3.84101C9.50577 3.74526 9.67585 3.59407 9.78357 3.44289C9.93664 3.22116 9.95364 3.15061 9.95364 2.80793C9.95364 2.46525 9.93664 2.3947 9.78357 2.17296C9.54545 1.83029 9.18829 1.64383 8.7234 1.61863C8.50797 1.60351 8.28686 1.62367 8.16214 1.66399ZM8.93317 2.53076C9.02388 2.60635 9.0749 2.71218 9.0749 2.80793C9.0749 2.90368 9.02388 3.0095 8.93317 3.0851C8.84813 3.16573 8.72907 3.21108 8.62135 3.21108C8.51364 3.21108 8.39458 3.16573 8.30954 3.0851C8.21883 3.0095 8.16781 2.90368 8.16781 2.80793C8.16781 2.71218 8.21883 2.60635 8.30954 2.53076C8.39458 2.45013 8.51364 2.40478 8.62135 2.40478C8.72907 2.40478 8.84813 2.45013 8.93317 2.53076Z" />
                                  <path d="M1.96009 3.33677C1.86938 3.41236 1.81836 3.51819 1.81836 3.61394C1.81836 3.70969 1.86938 3.81551 1.96009 3.8911C2.09049 4.01205 2.13584 4.01709 2.72545 4.01709C3.31506 4.01709 3.36042 4.01205 3.49081 3.8911C3.58152 3.81551 3.63254 3.70969 3.63254 3.61394C3.63254 3.51819 3.58152 3.41236 3.49081 3.33677C3.36042 3.21583 3.31506 3.21079 2.72545 3.21079C2.13584 3.21079 2.09049 3.21583 1.96009 3.33677Z" />
                                  <path d="M1.96009 4.94908C1.86938 5.02467 1.81836 5.13049 1.81836 5.22624C1.81836 5.32199 1.86938 5.42782 1.96009 5.50341C2.09049 5.62436 2.13584 5.62939 2.72545 5.62939C3.31506 5.62939 3.36042 5.62436 3.49081 5.50341C3.58152 5.42782 3.63254 5.32199 3.63254 5.22624C3.63254 5.13049 3.58152 5.02467 3.49081 4.94908C3.36042 4.82813 3.31506 4.82309 2.72545 4.82309C2.13584 4.82309 2.09049 4.82813 1.96009 4.94908Z" />
                                  <path d="M1.96009 6.56187C1.86938 6.63746 1.81836 6.74329 1.81836 6.83904C1.81836 6.93478 1.86938 7.04061 1.96009 7.1162C2.09049 7.23715 2.13584 7.24219 2.72545 7.24219C3.31506 7.24219 3.36042 7.23715 3.49081 7.1162C3.58152 7.04061 3.63254 6.93478 3.63254 6.83904C3.63254 6.74329 3.58152 6.63746 3.49081 6.56187C3.36042 6.44092 3.31506 6.43588 2.72545 6.43588C2.13584 6.43588 2.09049 6.44092 1.96009 6.56187Z" />
                                  <path d="M6.03052 7.19834C4.31271 8.72024 4.08594 8.94197 4.08594 9.07804C4.08594 9.17379 4.13696 9.28465 4.22767 9.37032L4.36373 9.50135H5.71303H7.05666L5.5713 10.8267C4.27303 11.9807 4.08594 12.1722 4.08594 12.3083C4.08594 12.5149 4.32405 12.7266 4.56216 12.7266C4.71523 12.7266 4.96468 12.5199 6.67682 10.998C8.80848 9.10324 8.79148 9.12339 8.47966 8.82607L8.3436 8.69504H6.9943H5.65067L7.13603 7.36968C8.42297 6.21566 8.6214 6.01912 8.6214 5.8881C8.6214 5.68148 8.38328 5.46983 8.14517 5.46983C7.9921 5.46983 7.74265 5.6714 6.03052 7.19834Z" />
                                  <path d="M5.589 15.2714C5.49829 15.347 5.44727 15.4528 5.44727 15.5486C5.44727 15.6443 5.49829 15.7502 5.589 15.8257C5.8668 16.0777 6.35436 15.9013 6.35436 15.5486C6.35436 15.342 6.13325 15.1454 5.90081 15.1454C5.79309 15.1454 5.67404 15.1908 5.589 15.2714Z" />
                                </svg>
                              </span>
                              <span className="text-xs font-400">
                                {category.name}
                              </span>
                            </div>
                            <div>
                              <span>
                                <svg
                                  className="fill-current"
                                  width="6"
                                  height="9"
                                  viewBox="0 0 6 9"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    x="1.49805"
                                    y="0.818359"
                                    width="5.78538"
                                    height="1.28564"
                                    transform="rotate(45 1.49805 0.818359)"
                                  />
                                  <rect
                                    x="5.58984"
                                    y="4.90918"
                                    width="5.78538"
                                    height="1.28564"
                                    transform="rotate(135 5.58984 4.90918)"
                                  />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </Link>
                      </li>
                      ))}
                      


                    </ul>
                  </div>
                </div>
                <div className="nav">
                  <ul className="nav-wrapper flex xl:space-x-10 space-x-5">
                    <li className="relative">
                      <Link to="/">
                        <span className="flex items-center text-sm text-qblack font-600 cursor-pointer ">
                          <span>Homepage</span>
                          <span className="ml-1.5 ">

                          </span>
                        </span>
                      </Link>
                    </li>
                    <li className="relative">
                      <Link to="/shop">
                        <span className="flex items-center text-sm text-qblack font-600 cursor-pointer ">
                          <span>Shop</span>
                          <span className="ml-1.5 ">

                          </span>
                        </span>
                      </Link>
                    </li>

                    {/* <li>
                      <span className="flex items-center text-sm text-qblack font-600 cursor-pointer ">
                        <span>Shop</span>
                        <span className="ml-1.5 ">
                          <Arrow className="fill-current" />
                        </span>
                      </span>
                      <div className="sub-menu w-full absolute left-0 top-[60px]">
                        <div
                          className="mega-menu-wrapper w-full bg-white p-[30px] flex justify-between items-center "
                          style={{
                            minHeight: "295px",
                            boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.14)",
                          }}
                        >
                          <div className="categories-wrapper flex-1 h-full flex justify-around -ml-[70px]">
                            <div>
                              <div className="category">
                                <h1 className="text-[13px] font-700 text-qblack uppercase mb-[13px]">
                                  Shop List
                                </h1>
                              </div>
                              <div className="category-items">
                                <ul className="flex flex-col space-y-2">
                                  <li>
                                    <a href="#">
                                      <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                        Shop Sidebar
                                      </span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                        Shop Fullwidth
                                      </span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                        Shop Category Icon
                                      </span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                        Shop Category Icon
                                      </span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                        Shop List View
                                      </span>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div>
                              <div className="category">
                                <h1 className="text-[13px] font-700 text-qblack uppercase mb-[13px]">
                                  Product Layouts
                                </h1>
                              </div>
                              <div className="category-items">
                                <ul className="flex flex-col space-y-2">
                                  <li>
                                    <a href="#">
                                      <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                        Horizonral Thumbnail
                                      </span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                        Vertical Thumbnail
                                      </span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                        Gallery Thumbnail
                                      </span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                        Sticky Summary
                                      </span>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div>
                              <div className="category">
                                <h1 className="text-[13px] font-700 text-qblack uppercase mb-[13px]">
                                  Polular Category
                                </h1>
                              </div>
                              <div className="category-items">
                                <ul className="flex flex-col space-y-2">
                                  <li>
                                    <a href="#">
                                      <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                        Phone & Tablet
                                      </span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                        Gaming & Sports
                                      </span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                        Home Appliance
                                      </span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                        Fashion Clothes
                                      </span>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="thumbnil w-[348px] h-full">
                            <div className="w-full h-[235px]">
                              <img
                                width=""
                                src={`/assets/images/mega-menu-thumb.jpg`}
                                alt=""
                                className="w-full h-full object-contain"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="relative">
                      <span className="flex items-center text-sm text-qblack font-600 cursor-pointer ">
                        <span>Pages</span>
                        <span className="ml-1.5 ">
                          <Arrow className="fill-current" />
                        </span>
                      </span>
                      <div className="sub-menu w-[220px] absolute left-0 top-[60px]">
                        <div
                          className="w-full bg-white flex justify-between items-center "
                          style={{
                            boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.14)",
                          }}
                        >
                          <div className="categories-wrapper w-full h-full p-5">
                            <div>
                              <div className="category-items">
                                <ul className="flex flex-col space-y-2">
                                  <li>
                                    <a href="/privacy-policy">
                                      <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                        Privacy Policy
                                      </span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="/terms-condition">
                                      <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                        Terms and Conditions
                                      </span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="/faq">
                                      <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                        FAQ
                                      </span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                        Shop Category Icon
                                      </span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                                        Shop List View
                                      </span>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li> */}
                    <li>
                      <Link to="/about">
                        <span className="flex items-center text-sm text-qblack font-600 cursor-pointer ">
                          <span>About</span>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/blogs">
                        <span className="flex items-center text-sm text-qblack font-600 cursor-pointer ">
                          <span>Blog</span>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact">
                        <span className="flex items-center text-sm text-qblack font-600 cursor-pointer ">
                          <span>Contact</span>
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar