import { useContext, useState } from "react";

import {
  useTanstackMutation,
  useTanstackQuery,
} from "../../common/hooks/useTanstackQuery";

import { useParams } from "react-router-dom";

import { AuthContext } from "../Auth/core/Auth";
import ThinLove from "../icons/ThinLove";



const productFake={
  "name": "Smartphone XYZ",
  "image": "https://example.com/images/smartphone-xyz.jpg",
  "status": 1,
  "gallery": [
      "https://example.com/images/smartphone-xyz-1.jpg",
      "https://example.com/images/smartphone-xyz-2.jpg",
      "https://example.com/images/smartphone-xyz-3.jpg"
  ],
  "parameter": "6.5 inch display, 128GB storage",
  "description": "A high-end smartphone with a 6.5-inch display, advanced camera system, and 128GB of storage.",
  "discount": 10,
  "featured": true,
  "tags": [
      "smartphone",
      "electronics",
      "mobile"
  ],
  "slug": "smartphone-xyz",
  "attributes": [
      {
          "key": "Color",
          "value": "Black"
      },
      {
          "key": "Storage",
          "value": "128GB"
      }
  ],
  "active": true,
  "category": "64dfe8b2c9b5a53c12345679",
  "brand": "64dfe8b2c9b5a53c12345670",
  "productItems": [
      {
          "productId": "64dfe8b2c9b5a53c12345678",
          "name": "Smartphone XYZ",
          "price": 699.99,
          "stock": 150,
          "reviews": [
              "64dfe8b2c9b5a53c87654321",
              "64dfe8b2c9b5a53c87654322"
          ],
          "rating": 4.5,
          "variants": [
              {
                  "key": "Color",
                  "value": [
                      "Black",
                      "White",
                      "Blue"
                  ]
              },
              {
                  "key": "Storage",
                  "value": [
                      "64GB",
                      "128GB",
                      "256GB"
                  ]
              }
          ]
      }
  ],
  "createdAt": "2024-08-20T10:00:00Z",
  "updatedAt": "2024-08-20T12:00:00Z"
}
const ProductView = ({ className }) => {
  const { currentUser } = useContext(AuthContext);
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

  console.log(product);



  const [quantity, setQuantity] = useState(1);



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
    // const attributesId = Object.keys(selectedAttributes).map((attr) => attr);
    // const valuesId = Object.values(selectedAttributes).map((attr) => attr._id);
    mutate({ productId: product._id, quantity,  });
  };




  const getStatus = (createdAt) => {
    const creationDate = new Date(createdAt);
    const now = new Date();
    const twoDays = 2 * 24 * 60 * 60 * 1000; // milliseconds in 2 days
    return now - creationDate <= twoDays ? "Mới" : "";
  };


  const checkProductInWishlist = (product) => {
    return (
      wishlistProducts?.findIndex((item) => item.productId === product._id) !==
      -1
    );
  };



  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error loading product details</p>;

  return (
    <form onSubmit={handleAddToCart}>
      <div
        className={`product-view w-full lg:flex justify-between ${
          className || ""
        }`}
      >
        <div
          data-aos="fade-right"
          className="lg:w-1/2 xl:mr-[70px] lg:mr-[50px]"
        >
          <div className="w-full">
            <div className="w-full h-[600px] border border-qgray-border flex justify-center items-center overflow-hidden relative mb-3">
              <img
                src={product.image}
                alt={product.name}
                className="object-contain w-full"
              />

              {getStatus(product.createdAt) && (
                <div className="w-[80px] h-[80px] rounded-full bg-red-500 text-qblack flex justify-center items-center text-xl font-medium absolute left-[30px] top-[30px]">
                  {getStatus(product.createdAt)}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="product-details w-full mt-10 lg:mt-0">
            <p
              data-aos="fade-up"
              className="text-xl font-medium text-qblack mb-4"
            >
              {product.name}{" "}{productFake?.productItems.map((rating, index) => (rating.rating ? <span className="text-sm text-gray-500" key={index}>({rating.rating})</span> : null ))}
              
            </p>

            <div
              data-aos="fade-up"
              className="flex space-x-2 items-center mb-7"
            >
              <span className="text-sm font-500 text-qgray line-through mt-2">
                {formatPrice(product?.priceOld)}
              </span>

              <span className="text-2xl font-500 text-qred">
                {formatPrice()}
              </span>
            </div>

           
                 <div className="flex flex-wrap mb-4">
              <div className="mb-4 flex flex-wrap">
                {productFake?.productItems.map((attribute) =>
                  attribute.variants.map((varriantitem, i) => (
                <div key={i} className="flex items-center"> {/* Thay đổi để hiện trên 1 dòng */}
                      {/*<span>{varriantitem.key}</span>*/}
                      {varriantitem.value.map((item, index) => (
                        <div key={index} className="mb-4 mr-4">
                          <p
                            className={`btn cursor-pointer  hover:bg-gray-300`}
                          >
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div
              data-aos="fade-up"
              className="quantity-card-wrapper w-full flex items-center h-[50px] space-x-[10px] mb-[30px]"
            >
              <div className="w-[120px] h-full px-[26px] flex items-center border border-qgray-border">
                <div className="flex justify-between items-center w-full">
                  <button
                    onClick={handleDecrement}
                    type="button"
                    className="text-base text-qgray"
                  >
                    -
                  </button>

                  <span className="text-qblack">{quantity}</span>

                  <button
                    onClick={handleIncrement}
                    type="button"
                    className="text-base text-qgray"
                  >
                    +
                  </button>
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
                      alert(
                        "Vui lòng đăng nhập để thêm sản phẩm vào danh sách yêu thích"
                      );
                    }
                  }}
                >
                  <span className="w-10 h-10 flex justify-center items-center rounded hover:bg-white">
                    <ThinLove
                      className="fill-current"
                      fillColor={
                        checkProductInWishlist(product) ? "red" : "black"
                      }
                    />
                  </span>
                </button>
              </div>

              <div className="flex-1 h-full">
                <button
                  type="submit"
                  className="black-btn text-sm font-semibold w-full h-full"
                >
                  Add To Cart
                </button>
              </div>
            </div>

            <div data-aos="fade-up" className="mb-[20px]">
              <p className="text-[13px] text-qgray leading-7">
                <span className="text-qblack">Danh mục: </span>

                {productFake?.category || "Không có danh mục"}
              </p>

              <p className="text-[13px] text-qgray leading-7">
                <span className="text-qblack">Nhãn hàng:</span> {productFake?.brand || "không có nhãn hàng"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductView;
