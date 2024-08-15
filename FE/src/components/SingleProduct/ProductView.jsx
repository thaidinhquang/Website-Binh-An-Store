import { useContext, useState } from "react";

import {
  useTanstackMutation,
  useTanstackQuery,
} from "../../common/hooks/useTanstackQuery";

import { useParams } from "react-router-dom";
import { Button } from "antd";
import { AuthContext } from "../Auth/core/Auth";
import ThinLove from "../icons/ThinLove";

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

  // Fetch category and brand data

  const { data: category } = useTanstackQuery(
    `categories/${product?.category?._id}`
  );

  const { data: brand } = useTanstackQuery(`brands/${product?.brand?._id}`);

  const [quantity, setQuantity] = useState(1);

  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState({});

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
    const attributesId = Object.keys(selectedAttributes).map((attr) => attr);
    const valuesId = Object.values(selectedAttributes).map((attr) => attr._id);
    mutate({ productId: product._id, quantity, attributesId, valuesId });
  };

  const handleAttributeSelect = (attributeId, value) => {
    setSelectedAttributes((prevAttributes) => ({
      ...prevAttributes,
      [attributeId]: value,
    }));
  };

  const handleAttributeChange = (attributeId) => {
    setSelectedAttribute(attributeId);
    setSelectedAttributes({});
  };

  const getStatus = (createdAt) => {
    const creationDate = new Date(createdAt);
    const now = new Date();
    const twoDays = 2 * 24 * 60 * 60 * 1000; // milliseconds in 2 days
    return now - creationDate <= twoDays ? "Mới" : "";
  };
  const calculateTotalPrice = () => {
    let totalPrice = product?.price || 0;
    Object.values(selectedAttributes).forEach((attr) => {
      totalPrice += attr.price;
    });
    return totalPrice;
  };

  const checkProductInWishlist = (product) => {
    return (
      wishlistProducts?.findIndex((item) => item.productId === product._id) !==
      -1
    );
  };
  const [showFullParameter, setShowFullParameter] = useState(false); // Add state for toggling

  const toggleParameterVisibility = () => {
    setShowFullParameter(!showFullParameter);
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
              {product.name}
            </p>

            <div
              data-aos="fade-up"
              className="flex space-x-2 items-center mb-7"
            >
              <span className="text-sm font-500 text-qgray line-through mt-2">
                {formatPrice(product?.priceOld)}
              </span>

              <span className="text-2xl font-500 text-qred">
                {formatPrice(calculateTotalPrice())}
              </span>
            </div>

            <div className="flex flex-wrap mb-4">
              {product?.attributes.map((attribute) => (
                <div key={attribute._id} className="mr-4 mb-4">
                  <p
                    onClick={() => handleAttributeChange(attribute._id)}
                    className={`cursor-pointer btn ${
                      selectedAttribute === attribute._id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                    } hover:bg-gray-300`}
                  >
                    {attribute.name}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap space-x-2">
              {product?.attributes.map(
                (attribute) =>
                  selectedAttribute === attribute._id &&
                  attribute.values.map((value) => (
                    <Button
                      key={value._id}
                      onClick={() =>
                        handleAttributeSelect(attribute._id, value)
                      }
                      className={`px-4 btn py-2 border border-qgray-border mb-2 ${
                        selectedAttributes[attribute._id]?._id === value._id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-black"
                      } hover:bg-gray-300`}
                    >
                      {value.name} - {formatPrice(value.price)}
                    </Button>
                  ))
              )}
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
                <span className="text-qblack">Category : </span>

                {category?.name || ""}
              </p>

              <p className="text-[13px] text-qgray leading-7">
                <span className="text-qblack">Brand :</span> {brand?.name || ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductView;
