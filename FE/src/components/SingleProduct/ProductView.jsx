import { useContext, useEffect, useState } from "react";

import {
  useTanstackMutation,
  useTanstackQuery,
} from "../../common/hooks/useTanstackQuery";

import { useParams } from "react-router-dom";

import { AuthContext } from "../Auth/core/Auth";
import ThinLove from "../icons/ThinLove";

const ProductView = ({ className }) => {
  // const demoProduct = {
  //   name: "Smartphone XYZ",
  //   image:
  //     "https://cdn.tgdd.vn/Products/Images/7077/306530/befit-watch-fit-den-fix-1.jpg",
  //   status: 1,
  //   gallery: [
  //     "https://cdn.tgdd.vn/Products/Images/7077/306530/befit-watch-fit-vang-1.jpg",
  //     "https://cdn.tgdd.vn/Products/Images/7077/306530/befit-watch-fit-hong-2-2.jpg",
  //     "https://cdn.tgdd.vn/Products/Images/7077/306530/befit-watch-fit-xanh-la-1-3.jpg",
  //   ],
  //   parameter: "6.5 inch display, 128GB storage",
  //   description:
  //     "A high-end smartphone with a 6.5-inch display, advanced camera system, and 128GB of storage.",
  //   discount: 10,
  //   featured: true,
  //   tags: ["smartphone", "electronics", "mobile"],
  //   slug: "smartphone-xyz",
  //   attributes: [
  //     {
  //       key: "Display",
  //       value: "5 inch",
  //     },
  //     {
  //       key: "Camera",
  //       value: "16mp",
  //     },
  //     {
  //       key: "CPU",
  //       value: "16mp",
  //     },  {
  //       key: "Độ phân giải",
  //       value: "200 x 320 Pixels",
  //     },  {
  //       key: "Chất liệu mặt",
  //       value: "Mặt kính nhựa",
  //     },  {
  //       key: "Chất liệu khung viền",
  //       value: "Hợp kim nhôm",
  //     },  {
  //       key: "Tính năng cho sức khỏe:",
  //       value: "Đếm số bước chânĐo nồng độ oxy (SpO2)Đo nhịp timTính quãng đường chạyTính lượng calories tiêu thụTheo dõi giấc ngủBài tập thở",
  //     },
  //   ],
  //   active: true,
  //   category: "64dfe8b2c9b5a53c12345679",
  //   brand: "64dfe8b2c9b5a53c12345670",
  //   productItems: [
  //     {
  //       productId: "64dfe8b2c9b5a53c12345671",
  //       name: "Smartphone XYZ",
  //       price: 699.99,
  //       stock: 120,
  //       reviews: ["64dfe8b2c9b5a53c87654321", "64dfe8b2c9b5a53c87654322"],
  //       rating: 4.5,
  //       variants: [
  //         {
  //           key: "Color",
  //           value: "Red",
  //         },
  //         {
  //           key: "Storage",
  //           value: "128GB",
  //         },
  //       ],
  //     },
  //     {
  //       productId: "64dfe8b2c9b5a53c12345638",
  //       name: "Smartphone XYZ",
  //       price: 799.99,
  //       stock: 140,
  //       reviews: ["64dfe8b2c9b5a53c87654321", "64dfe8b2c9b5a53c87654322"],
  //       rating: 5,
  //       variants: [
  //         {
  //           key: "Color",
  //           value: "Green",
  //         },
  //         {
  //           key: "Storage",
  //           value: "128GB",
  //         },
  //       ],
  //     },
  //     {
  //       productId: "64dfe8b2c9b5a53c12345618",
  //       name: "Smartphone XYZ",
  //       price: 899.99,
  //       stock: 150,
  //       reviews: ["64dfe8b2c9b5a53c87654321", "64dfe8b2c9b5a53c87654322"],
  //       rating: 4.6,
  //       variants: [
  //         {
  //           key: "Color",
  //           value: "Black",
  //         },
  //         {
  //           key: "Storage",
  //           value: "526GB",
  //         },
  //       ],
  //     },
  //   ],
  //   createdAt: "2024-08-20T10:00:00Z",
  //   updatedAt: "2024-08-20T12:00:00Z",
  // };
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

    mutate({ productId: product._id, quantity });
  };

  const getStatus = (createdAt) => {
    const creationDate = new Date(createdAt);
    const now = new Date();
    const twoDays = 2 * 24 * 60 * 60 * 1000; // milliseconds in 2 days
    return now - creationDate <= twoDays ? "Mới" : "";
  };

  const checkProductInWishlist = (product) => {
    return (
      wishlistProducts?.findIndex((item) => item.productId === product._id) !==-1
    );
  };

  useEffect(() => {
    setVariant(() => product?.productItems[0]);
  }, []);
  const handleSelectVariant = (variant) => {
    setVariant(variant);
  };

  const [selectedImage, setSelectedImage] = useState(product?.image); // State to hold the selected image

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
          className="lg:w-1/2 xl:mr-[70px] lg:mr-[50px] flex flex-col" // Added flex and flex-col for vertical layout
        >
          <div className="w-full h-[600px] border border-qgray-border flex justify-center items-center overflow-hidden relative mb-3">
            <img
              src={selectedImage} // Use selected image
              alt={product.name}
              className="object-contain w-full"
            />

            {getStatus(product.createdAt) && (
              <div className="w-[80px] h-[80px] rounded-full bg-red-500 text-qblack flex justify-center items-center text-xl font-medium absolute left-[30px] top-[30px]">
                {getStatus(product.createdAt)}
              </div>
            )}
          </div>

          <div className="flex overflow-x-auto space-x-2 mb-3">
            {" "}
        
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
            <p
              data-aos="fade-up"
              className="text-xl font-medium text-qblack mb-4"
            >
              {product?.name}{" "}
              {variants?.rating ? (
                <span className="text-sm text-gray-500">
                  ({variants?.rating})
                </span>
              ) : null}
            </p>

            <div
              data-aos="fade-up"
              className="flex space-x-2 items-center mb-7"
            >
              <span className="text-2xl font-500 text-qred">
                {formatPrice(variants?.price)}
              </span>
            </div>
            <div className="my-2">
              <span>Số Lượng: {variants?.stock}</span>
            </div>

            <div className="flex gap-2 mb-4">
              {product.productItems.map((productItem, i) => {
                return (
                  <div
                    onClick={() => handleSelectVariant(productItem)}
                    key={i}
                    className={`border-2 flex gap-2 h-[50px]  items-center ${
                      variants?._id === productItem._id
                        ?"border-cyan-500"
                        :  "border-black" 
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
        <tr
          key={index}
          className={` ${
            index % 2 === 0
              ? 'bg-gray-100' 
              : 'bg-white' 
          }`}
        >
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
