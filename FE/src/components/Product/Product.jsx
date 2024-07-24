
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import instance from '../../config/axios';
import QuickViewIco from '../icons/QuickViewIco';
import Compair from '../icons/Compair';
import ThinLove from '../icons/ThinLove';

const ProductCard = ({ product, mutate, isPending }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  // Fetch attributes data
  

  const handleAddToCart = () => {

    mutate({ productId: product._id, quantity:1, });
  };

  return (
    <div key={product._id} className="product-card-one bg-white relative group overflow-hidden shadow-md">
      <div className="product-card-img h-80 overflow-hidden">
        <img
          className="w-full h-[300px]"
          src={product.image}
          alt=""
        />
      </div>

      <div className="product-card-details px-[30px] pb-[80px] relative">
        <div className="absolute w-full h-10 px-[30px] left-0 top-40 group-hover:top-[85px] transition-all duration-300 ease-in-out">
          <Link
            to={`/detail/${product._id}`}
            className={isPending ? "blue-btn" : "yellow-btn"}
          >
            <div className="flex items-center space-x-3">
             
              <span>{isPending ? "..." : "Xem chi tiết"}</span>
            </div>
          </Link>
        </div>
        <Link to={`/detail/${product._id}`}>
          <p className="title mb-2 text-[15px] font-600 text-qblack leading-[24px] line-clamp-2 hover:text-blue-600">
            {product.name}
          </p>
        </Link>

        <p className="price">
          <span className="main-price text-qgray line-through text-[18px]">
            {formatPrice(product.price)}
          </span>
          <span className="offer-price text-qred font-600 text-[18px] ml-2">
            {formatPrice(product.price)}
          </span>
        </p>
      </div>
      <div className="quick-access-btns flex flex-col space-y-2 absolute group-hover:right-4 -right-10 top-20 transition-all duration-300 ease-in-out">
        <Link to={`/detail/${product._id}`}>
          <span className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
            <QuickViewIco />
          </span>
        </Link>
        <a href="#">
          <span className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
            <ThinLove />
          </span>
        </a>
       
      </div>
    </div>
  );
};

export default ProductCard;
