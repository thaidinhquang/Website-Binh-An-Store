
import { Link, useLocation } from 'react-router-dom';
import QuickViewIco from '../icons/QuickViewIco';
import ThinLove from '../icons/ThinLove';
import { useTanstackMutation, useTanstackQuery } from '../../common/hooks/useTanstackQuery';
import Pageination from '../UI/Pagination';
import { useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from "../Auth/core/Auth";

const ProductCard = ({ limit, pagination, className, related = '' }) => {
  const { currentUser, isLogin } = useContext(AuthContext);
  const location = useLocation();
  const search = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const page = search.get('page') || 1;
  const sort = search.get('sort') || '';
  const name = search.get('name') || '';
  const categories = search.get('categories') || '';
  const { data, isLoading, refetch } = useTanstackQuery(related ? 'products/related/' + related : 'products', { limit, active: true, page, sort, name, categories });
  const { data: wishlistProducts } = useTanstackQuery('wishlist/products', {}, true, isLogin);
  const { mutate: addToWishlist } = useTanstackMutation({ path: `wishlist/add`, action: "CREATE" });
  const { mutate: removeFromWishlist } = useTanstackMutation({ path: `wishlist/remove`, action: "CREATE" });
  useEffect(() => {
    refetch();
  }, [search]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getStatus = (createdAt) => {
    const creationDate = new Date(createdAt);
    const now = new Date();
    const twoDays = 2 * 24 * 60 * 60 * 1000; // milliseconds in 2 days
    return now - creationDate <= twoDays ? "Mới" : "";
  };

  const checkProductInWishlist = (product) => {
    return wishlistProducts?.findIndex((item) => item.productId === product._id) !== -1;
  };

  if (isLoading) return <p>Đang tải...</p>;
  if (!data?.docs?.length) {
    return <p>Không có sản phẩm nào</p>;
  }
  return (
    <>
      <div className={className}>
        {data?.docs.map((product) => (
          <div key={product._id} className="product-card-one bg-white relative group overflow-hidden shadow-md">
            <div className="product-card-img  overflow-hidden">
              {getStatus(product.createdAt) && (
                <span className="new-product-label absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full">
                  {getStatus(product.createdAt)}
                </span>
              )}
              <div className="product-card-img w-full h-[300px] flex items-center">
                <img

                  src={product.image}
                  alt=""
                />
              </div>
            </div>
            <div className="product-card-details px-[30px] pb-[30px] relative">
              <div className="absolute w-full h-10 px-[30px] left-0 top-40 group-hover:top-[50px] transition-all duration-300 ease-in-out">
                <Link to={`/detail/${product._id}`} className={"yellow-btn"}>
                  <div className="flex items-center space-x-3">
                    <span>Xem chi tiết</span>
                  </div>
                </Link>
              </div>
              <Link to={`/detail/${product._id}`}>
                <p className="title mb-2 text-[15px] font-600 text-qblack leading-[24px] line-clamp-2 hover:text-blue-600">
                  {product.name}
                </p>
              </Link>
              <p className="price">
                <span className="offer-price text-qred font-semibold text-[15px] ml-2">
                  {formatPrice(product?.productItems?.[0]?.price)}
                </span>
              </p>
            </div>
            <div className="quick-access-btns flex flex-col space-y-2 absolute group-hover:right-4 -right-10 top-20 transition-all duration-300 ease-in-out">
              <Link to={`/detail/${product._id}`}>
                <span className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
                  <QuickViewIco />
                </span>
              </Link>

              <button
                onClick={() => {
                  if (currentUser) {
                    if (checkProductInWishlist(product)) {
                      removeFromWishlist({ productId: product._id });
                    } else {
                      addToWishlist({ productId: product._id });
                    }
                  } else {
                    alert('Vui lòng đăng nhập để thêm sản phẩm vào danh sách yêu thích');
                  }
                }}
              >
                <span className={`w-10 h-10 flex justify-center items-center rounded ${checkProductInWishlist(product) ? 'bg-white' : 'bg-primarygray'} hover:bg-white`}>
                  <ThinLove className="fill-current" fillColor={checkProductInWishlist(product) ? 'red' : 'black'} />
                </span>
              </button>
            </div>
          </div>
        ))
        }

      </div>
      {pagination && <Pageination data={data} />}
    </>
  );
}
export default ProductCard;
