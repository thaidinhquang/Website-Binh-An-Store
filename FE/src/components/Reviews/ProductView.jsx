import { useState} from "react";
import { useTanstackMutation, useTanstackQuery } from "../../common/hooks/useTanstackQuery";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import instance from "../../config/axios";
import { Button } from "antd";

const ProductViews = ({ className }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const { id } = useParams();

  // Fetch product data
  const { data: product, isLoading, error } = useTanstackQuery(`/products/${id}`);

  // Fetch category and brand data
  const { data: category } = useTanstackQuery(`categories/${product?.category?._id}`);
  const { data: brand } = useTanstackQuery(`brands/${product?.brand}`);

  const { data: attributes, isLoading: attributesLoading } = useQuery({
    queryKey: ["attributes"],
    queryFn: async () => {
      const { data } = await instance.get(`/attributes`);
      return data;
    },
  });

  // Filter attributes based on product attributes
  const productAttributes = attributes?.filter(attr => product?.attributes.includes(attr._id));

  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [quantity, setQuantity] = useState(1);

  const { mutate } = useTanstackMutation({
    path: `cart/add-item`,
    action: "CREATE",
  });

  // useEffect(() => {
  //   if (productAttributes) {
  //     const defaultAttributes = {};
  //     productAttributes.forEach(attr => {
  //       if (attr.values.length > 0) {
  //         defaultAttributes[attr._id] = attr.values[0]._id;
  //       }
  //     });
  //     setSelectedAttributes(defaultAttributes);
  //   }
  // }, [productAttributes]);

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
  };

  const handleAttributeSelect = (attrId, valueId) => {
    setSelectedAttributes(prevState => ({
      ...prevState,
      [attrId]: valueId,
    }));
  };

  const handleAddToCart = (event) => {
    event.preventDefault();

    const attributesArray = Object.values(selectedAttributes);
    mutate({ productId: product._id, quantity, attributesId: attributesArray });
  };


   const getStatus = (createdAt) => {
    const creationDate = new Date(createdAt);
    const now = new Date();
    const twoDays = 2 * 24 * 60 * 60 * 1000; // milliseconds in 2 days
    return now - creationDate <= twoDays ? 0 : 1;
  };
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product details</p>;

  return (
    <form onSubmit={handleAddToCart}>
      <div className={`product-view w-full lg:flex justify-between ${className || ""}`}>
        <div data-aos="fade-right" className="lg:w-1/2 xl:mr-[70px] lg:mr-[50px]">
          <div className="w-full">
            <div className="w-full h-[600px] border border-qgray-border flex justify-center items-center overflow-hidden relative mb-3">
              <img src={product.image} alt={product.name} className="object-contain w-full" />
              <div className="w-[80px] h-[80px] rounded-full bg-qyellow text-qblack flex justify-center items-center text-xl font-medium absolute left-[30px] top-[30px]">
                <span>{getStatus(product.createdAt) === 0 ? "New" : ""}
        </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="product-details w-full mt-10 lg:mt-0">
            <p data-aos="fade-up" className="text-xl font-medium text-qblack mb-4">
              {product.name}
            </p>

            <div data-aos="fade-up" className="flex space-x-2 items-center mb-7">
              <span className="text-sm font-500 text-qgray line-through mt-2">
                {formatPrice(product?.priceOld)}
              </span>
              <span className="text-2xl font-500 text-qred">
                {formatPrice(product?.price)}
              </span>
            </div>

            {/* Display attributes */}
             <div className="my-9">
      {attributesLoading ? (
        <p>Loading attributes...</p>
      ) : (
        productAttributes?.map((attr) => (
          <div key={attr._id}>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {attr.name}
            </label>
            <div className="my-2">
              {attr.values.map((value) => (
                <Button
                  key={value._id}
                  className={`m-1 p-6 border ${selectedAttributes[attr._id] === value._id ? "border-blue-500 bg-blue-500 text-white" : "border-gray-300"} hover:border-red-500`}
                  onClick={() => handleAttributeSelect(attr._id, value._id)}
                >
                  {value.name}
                </Button>
              ))}
            </div>
          </div>
        ))
      )}
    </div>

            <div data-aos="fade-up" className="quantity-card-wrapper w-full flex items-center h-[50px] space-x-[10px] mb-[30px]">
              <div className="w-[120px] h-full px-[26px] flex items-center border border-qgray-border">
                <div className="flex justify-between items-center w-full">
                  <button onClick={handleDecrement} type="button" className="text-base text-qgray">
                    -
                  </button>
                  <span className="text-qblack">{quantity}</span>
                  <button onClick={handleIncrement} type="button" className="text-base text-qgray">
                    +
                  </button>
                </div>
              </div>
              <div className="w-[60px] h-full flex justify-center items-center border border-qgray-border">
                <button type="button">
                  <span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 1C14.9 1 13.1 2.1 12 3.7C10.9 2.1 9.1 1 7 1C3.7 1 1 3.7 1 7C1 13 12 22 12 22C12 22 23 13 23 7C23 3.7 20.3 1 17 1Z" stroke="#D5D5D5" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                    </svg>
                  </span>
                </button>
              </div>
              <div className="flex-1 h-full">
                <button type="submit" className="black-btn text-sm font-semibold w-full h-full">
                  Add To Cart
                </button>
              </div>
            </div>

            <div data-aos="fade-up" className="mb-[20px]">
              <p className="text-[13px] text-qgray leading-7">
                <span className="text-qblack">Category : </span>
                {category?.name || "Loading category..."}
              </p>
              <p className="text-[13px] text-qgray leading-7">
                <span className="text-qblack">Brand :</span> {brand?.name || "No brand available"}
              </p>
              <p className="text-[13px] text-qgray leading-7">
                <span className="text-qblack">SKU:</span> KE-91039
              </p>
            </div>

            <div data-aos="fade-up" className="flex space-x-2 items-center mb-[20px]">
              <span>
                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0C0.247634 0 0.475436 0 0.729172 0C0.738324 0.160174 0.747477 0.316279 0.757647 0.493233C1.05816 0.392044 1.33885 0.282211 1.62818 0.203395C3.11296 -0.201361 4.51385 0.0366111 5.84202 0.779512C6.47661 1.13494 7.14171 1.39071 7.86987 1.47207C8.88125 1.58496 9.82093 1.35817 10.7098 0.88426C10.9335 0.765274 11.1522 0.636627 11.411 0.491199C11.4161 0.606117 11.4237 0.693577 11.4237 0.780529C11.4242 3.18822 11.4222 5.5954 11.4288 8.00309C11.4293 8.1892 11.3718 8.29089 11.2096 8.38039C9.31956 9.42279 7.4285 9.43499 5.54557 8.37734C4.06231 7.54443 2.55363 7.43307 0.992568 8.13835C0.804428 8.22327 0.737816 8.33005 0.739341 8.53904C0.749003 9.9206 0.744426 11.3027 0.744426 12.6842C0.744426 12.7849 0.744426 12.8851 0.744426 13C0.48764 13 0.265823 13 0 13C0 8.66634 0 4.33277 0 0Z" fill="#D5D5D5" />
                  <path d="M5.17567 5.8202C5.17411 4.52091 6.2855 3.45296 7.54608 3.47337C8.73868 3.49292 9.83678 4.51628 9.8311 5.80426C9.82593 7.0709 8.70203 8.19342 7.43526 8.17978C6.27198 8.16749 5.17724 7.04002 5.17567 5.8202Z" fill="#D5D5D5" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductViews;
