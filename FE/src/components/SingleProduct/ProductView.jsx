import { useContext, useEffect, useState } from "react";
import {
  useTanstackMutation,
  useTanstackQuery,
} from "../../common/hooks/useTanstackQuery";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Auth/core/Auth";
import ThinLove from "../icons/ThinLove";
import { toast } from 'react-toastify';

const ProductView = ({ className }) => {
  const { currentUser } = useContext(AuthContext);
  const [variants, setVariant] = useState(null);
  const { data: wishlistProducts } = useTanstackQuery("wishlist/products");
  const { mutate: addToWishlist } = useTanstackMutation({
    path: `wishlist/add`,
    action: "CREATE",
  });
  const { mutate: removeFromWishlist } = useTanstackMutation({
    path: `wishlist/remove`,
    action: "CREATE",
  });
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const { id } = useParams();

  // Fetch product data
  const {
    data: product,
    isLoading,
    error,
  } = useTanstackQuery(`/products/${id}`);

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVariantId, setSelectedVariantId] = useState(null); // State to track selected variant

  const { mutate } = useTanstackMutation({
    path: `cart/add-item`,
    action: "CREATE",
  });

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleAddToCart = (event) => {
    event.preventDefault();
    if (!currentUser) {
      toast.error("Vui lòng đăng nhập để mua hàng");
      return;
    }
    if (variants?.stock <= 0) {
      toast.error("Không thể thêm sản phẩm vì sản phẩm đã hết hàng.");
      return;
    }
    if (quantity > variants?.stock) {
      toast.error("Không thể thêm sản phẩm vì số lượng vượt quá tồn kho.");
      return;
    }
    mutate({
      productId: variants?._id,
      quantity,
      name: product?.name,
    });
  };

  const getStatus = (createdAt) => {
    const creationDate = new Date(createdAt);
    const now = new Date();
    const twoDays = 2 * 24 * 60 * 60 * 1000; // milliseconds in 2 days
    return now - creationDate <= twoDays ? "Mới" : "";
  };

  const checkProductInWishlist = (product) => {
    return (
      wishlistProducts?.findIndex((item) => item.productId === product._id) !== -1
    );
  };

  useEffect(() => {
    setVariant(() => product?.productItems[0]);
    setSelectedImage(product?.image || product?.productItems[0]?.image);  // Set initial selected image
  }, [product]);

  const handleSelectVariant = (variant) => {
    setVariant(variant);
    setSelectedImage(variant?.image);
    // setSelectedVariantId(variant._id); // Set the selected variant ID
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product details</p>;

  return (
    <form onSubmit={handleAddToCart}>
      <div className={`product-view w-full lg:flex justify-between ${className || ""}`}>
        <div data-aos="fade-right" className="lg:w-1/2 xl:mr-[70px] lg:mr-[50px] flex flex-col">
          <div className="w-full h-[600px] border border-qgray-border flex justify-center items-center overflow-hidden relative mb-3">
            <img
              src={selectedImage || product.image}
              alt={selectedImage?.name}
              className="object-contain w-full"
            />
            {getStatus(product.createdAt) && (
              <div className="w-[80px] h-[80px] rounded-full bg-red-500 text-qblack flex justify-center items-center text-xl font-medium absolute left-[30px] top-[30px]">
                {getStatus(product.createdAt)}
              </div>
            )}
          </div>

          <div className="flex overflow-x-auto space-x-2 mb-3">
            {product.gallery.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-1/4 h-auto cursor-pointer border"
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="product-details w-full mt-10 lg:mt-0">
            <p data-aos="fade-up" className="text-xl font-medium text-qblack mb-4">
              {product?.name}{" "}
              {variants?.rating ? (
                <span className="text-sm text-gray-500">({variants?.rating})</span>
              ) : null}
            </p>

            <div data-aos="fade-up" className="flex space-x-2 items-center mb-7">
              <span className="text-2xl font-500 text-qred">{formatPrice(variants?.price)}</span>
            </div>
            <div className="my-2">
              <span>Số Lượng: {variants?.stock}</span>
              {variants?.stock === 0 && (
                <span className="text-red-500 ml-2">(Hết hàng)</span>
              )}
            </div>

            <div className="flex gap-2 mb-4">
              {product.productItems.map((productItem, i) => {
                return (
                  <div
                    onClick={() => handleSelectVariant(productItem)}
                    key={i}
                    className={`border-2 flex gap-2 h-[50px] items-center ${
                      variants?._id === productItem?._id ? "border-cyan-500" : "border-black"
                    } p-2 cursor-pointer`}
                  >
                    {productItem.variants.map((item, index) => (
                      <p key={index} className="text-black">
                        {item.value}
                      </p>
                    ))}
                  </div>
                );
              })}
            </div>

            <div data-aos="fade-up" className="quantity-card-wrapper w-full flex items-center h-[50px] space-x-[10px] mb-[30px]">
              <div className="w-[120px] h-full px-[26px] flex items-center border border-qgray-border">
                <div className="flex justify-between items-center w-full">
                  <button onClick={handleDecrement} type="button" className="text-base text-qgray">-</button>
                  <span className="text-qblack">{quantity}</span>
                  <button onClick={handleIncrement} type="button" className="text-base text-qgray" disabled={quantity >= variants?.stock}>+</button>
                </div>
              </div>

              <div className="w-[60px] h-full flex justify-center items-center border border-qgray-border">
                <button
                  type="button"
                  onClick={() => {
                    if (currentUser) {
                      if (checkProductInWishlist(product)) {
                        removeFromWishlist({ productId: product._id });
                      } else {
                        addToWishlist({ productId: product._id });
                      }
                    } else {
                      toast.error("Vui lòng đăng nhập để thêm sản phẩm vào danh sách yêu thích");
                    }
                  }}
                >
                  <span className="w-10 h-10 flex justify-center items-center rounded hover:bg-white">
                    <ThinLove
                      className="fill-current"
                      fillColor={checkProductInWishlist(product) ? "red" : "black"}
                    />
                  </span>
                </button>
              </div>

              <div className="flex-1 h-full">
                <button type="submit" className={`black-btn text-sm font-semibold w-full h-full ${variants?.stock === 0 || !currentUser ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={variants?.stock === 0}>
                  Add To Cart
                </button>
                {!currentUser && (
                  <p className="text-red-500 mt-2">Vui lòng đăng nhập để mua hàng</p>
                )}
              </div>
            </div>

            <div data-aos="fade-up" className="mb-[20px]">
              <p className="text-[13px] text-qgray leading-7">
                <span className="text-qblack">Danh mục: </span>
                {product?.category?.name || "Không có danh mục"}
              </p>

              <p className="text-[13px] text-qgray leading-7">
                <span className="text-qblack">Nhãn hàng:</span>{" "}
                {product?.brand?.name || "không có nhãn hàng"}
              </p>
            </div>

            <div>
              <table className="w-full">
                <tbody>
                  {product?.attributes.map((attribute, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                      <td className="px-4 py-2 font-bold text-gray-800">{attribute.key}</td>
                      <td className="px-4 py-2 text-gray-600">{attribute.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductView;