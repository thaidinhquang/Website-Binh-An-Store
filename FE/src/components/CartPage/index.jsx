import { Link } from "react-router-dom";
import {
  useTanstackQuery,
  useTanstackMutation,
} from "../../common/hooks/useTanstackQuery";
import BreadcrumbCom from "../UI/BreadcrumbCom";
import PageTitle from "../UI/PageTitle";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/core/Auth";
import { useCart } from "../../common/contexts/CartContext";
import { Checkbox } from "antd";
import { toast } from "react-toastify";

const CartPage = ({ cart = true, className }) => {
  const [products, setProducts] = useState([]);
  const { state, dispatch } = useCart();

  const handleAddItem = (item) => {
    dispatch({ type: "ADD_ITEMS", payload: item });
  };
  const handleRemoveItem = (id) => {
    dispatch({ type: "REMOVE_ITEMS", payload: id });
  };
  const [isLoadingItem, setIsLoadingItem] = useState(false);
  const [items, setItems] = useState([]);
  const { data, isLoading } = useTanstackQuery("cart");
  const {
    data: cartTotal,
    isLoading: isLoadingCartTotal,
    refetch,
  } = useTanstackQuery("cart/total");
  useEffect(() => {
    dispatch({ type: "SET_ITEMS_CART", payload: data?.products });
  }, [data, dispatch]);

  const onchangeItemsChecked = (e, productVariation) => {
    if (productVariation.productId.stock === 0) {
      toast.error("Sản phẩm đã hết hàng");
      return;
    }
    const updatedItems = items.map(item => {
      if (item._id === productVariation._id) {
        return { ...item, checked: e.target.checked };
      }
      return item;
    });
    setItems(updatedItems);
    if (!e.target.checked) {
      handleRemoveItem(productVariation._id);
    } else if (e.target.checked) {
      handleAddItem(productVariation);
    }
  };

  const { mutate: increaseProduct } = useTanstackMutation({
    path: `cart/increase-quantity`,
    action: "CREATE",
  });
  const { mutate: decreaseProduct } = useTanstackMutation({
    path: `cart/decrease-quantity`,
    action: "CREATE",
  });
  const { mutate: removeProduct } = useTanstackMutation({
    path: `cart/remove-item`,
    action: "CREATE",
  });
  const { mutate: clearCart } = useTanstackMutation({
    path: `cart/clear`,
    action: "CREATE",
  });
  const { mutate: order, data: response } = useTanstackMutation({
    path: `orders/create-checkout-session`,
    action: "CREATE",
  });
  const { currentUser } = useContext(AuthContext);

  const calculateTotalPrice = (item) => {
    return item?.productId?.price * item?.quantity;
  };

  const onHandleRemove = (productId) => {
    removeProduct({ productId });
    handleRemoveItem(productId); // Remove from global state
    setProducts((prevProducts) => prevProducts.filter(item => item.productId._id !== productId));
  };

  const handleClearCart = () => {
    clearCart();
    dispatch({ type: "REMOVE_ALL" });
    setItems([]);
  };

  const updateProduct = (product, action) => {
    const productId = product.productId._id;
    const productData = data.products.find(
      (item) => item.productId._id === productId
    );
    const quantity = productData.quantity;
    const stock = product.productId.stock; // Assuming stock is a property of productId

    if (action === "increase") {
      if (quantity < 5 && quantity < stock) { // Limit to 5 products and stock
        increaseProduct({ productId });
        productData.quantity++;
      } else if (quantity >= stock) {
        toast.error("Số lượng vượt quá tồn kho");
      } else {
        toast.error("Không được lấy quá 5 sản phẩm");
      }
    }   

    if (action === "decrease") {
      if (quantity > 1) { // Limit to minimum 1 product
        decreaseProduct({ productId });
        productData.quantity--;
      } else {
        toast.error("Số lượng không được dưới 1");
      }
    }

    if (action === "remove") {
      if (data.products.length > 1) { // Prevent removing the last product
        removeProduct({ productId });
        data.products = data.products.filter(
          (item) => item.productId._id !== productId
        );
      } else {
        toast.error("Không thể xóa sản phẩm cuối cùng");
      }
    }

    setTimeout(() => {
      refetch();
    }, 1000);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price || 0);
  };

  const onSubmit = async () => {
    const data = {
      userId: currentUser._id,
      items: items,
      currency: "vnd",
    };
    order(data);
  };

  useEffect(() => {
    if (response) {
      window.location.replace(response.sessionUrl);
    }
  }, [response]);

  useEffect(() => {
    if (data?.products?.length > 0) {
      setIsLoadingItem(true);
      let listItem = [];
      state?.items?.forEach((item) => {
        if (item.productId.stock > 0) {
          listItem.push({
            name: item?.name,
            image: item?.productId?.image,
            price: item?.productId?.price,
            quantity: item.quantity,
            variants: item?.productId?.variants,
            productId: item?.productId?._id,
            _id: item?._id,
            checked: false,
          });
        } else {
          handleRemoveItem(item._id);
        }
      });
      setItems(listItem);
      setIsLoadingItem(false);
    }
  }, [data, state.items]);


  if (isLoading) return <p>Loading...</p>;

  const totalPrice = state?.items?.reduce(
    (total, item) => total + item?.productId?.price * item?.quantity,
    0
  );

  return (
    <div className={cart ? "pt-0 pb-0" : ""}>
      {cart === false ? (
        <div className="cart-page-wrapper w-full">
          <div className="container-x mx-auto">
            <BreadcrumbCom
              paths={[
                { name: "home", path: "/" },
                { name: "cart", path: "/cart" },
              ]}
            />
          </div>
        </div>
      ) : (
        <div className="cart-page-wrapper w-full  bg-white pb-[60px]">
          <div className="w-full">
            <PageTitle
              title="Giỏ hàng"
              breadcrumb={[
                { name: "home", path: "/" },
                { name: "cart", path: "/cart" },
              ]}
            />
          </div>
          <div className="w-full mt-[23px]">
            <div className="container-x mx-auto">
              {/* Chinh sua */}
              <div className="mb-[30px]">
                <div className={`w-full ${className || ""}`}>
                  <div className="relative w-full border border-[#EDEDED]">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead>
                        <tr>
                          <th className="py-4 whitespace-nowrap text-center"></th>
                          <td className="py-4 pl-10 block whitespace-nowrap min-w-[300px]">
                            Product
                          </td>
                          <th className="py-4 whitespace-nowrap text-center">
                            Price
                          </th>
                          <th className="py-4 whitespace-nowrap text-center">
                            Quantity
                          </th>
                          <th className="py-4 whitespace-nowrap text-center">
                            Total
                          </th>
                          <th className="py-4 whitespace-nowrap text-center"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {!data?.products.length > 0 && state.items ? (
                          <tr>
                            <td colSpan="6" className="text-center py-4">
                              Không có sản phẩm !
                            </td>
                          </tr>
                        ) : (
                          data.products.map((item, index) => {
                            const demo = state?.items?.some(
                              (v) => v._id === item._id
                            );
              
                            return (
                              <tr
                                key={index}
                                className="bg-white border-b hover:bg-gray-50"
                              >
                                <td className="text-center py-4 px-2">
                                  <div className="flex space-x-1 items-center justify-center">
                                    <Checkbox
                                      onChange={(e) =>
                                        onchangeItemsChecked(e, item)
                                      }
                                      checked={item.productId.stock > 0 && demo}
                                      disabled={item.productId.stock === 0}
                                    />
                                  </div>
                                </td>

                                <td className="pl-10 py-4 w-[380px]">
                                  <div className="flex space-x-6 items-center relative">
                                    <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
                                      <img
                                        src={
                                          item?.image || item?.productId?.image
                                        }
                                        alt="product"
                                        className="w-full h-full object-contain"
                                      />
                                       {item.productId.stock === 0 && (
                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold">
                                          Hết hàng
                                        </div>
                                      )}
                                     
                                    </div>
                                    <div className="flex-1 flex flex-col">
                                      <p className="font-medium text-[15px] text-qblack">
                                        {item.name}
                                      </p>
                                      <div>
                                        {item?.productId?.variants
                                          ?.map((variant) => variant.value)
                                          .join(", ")}
                                      </div>
                                    </div>
                                  </div>
                                </td>

                                <td className="text-center py-4 px-2">
                                  <div className="flex space-x-1 items-center justify-center">
                                    <span className="text-[15px] font-normal">
                                      {formatPrice(item?.productId?.price)}
                                    </span>
                                  </div>
                                  
                                </td>

                                <td className="py-4">
                                  <div className="flex justify-center items-center space-x-2">
                                    <button
                                      disabled={item.quantity === 1}
                                      onClick={() =>
                                        updateProduct(item, "decrease")
                                      }
                                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded"
                                    >
                                      -
                                    </button>
                                    <input
                                      type="text"
                                      value={item.quantity}
                                      readOnly
                                      className="w-12 text-center border border-gray-300 rounded"
                                    />
                                    <button
                                      onClick={() =>
                                        updateProduct(item, "increase")
                                      }
                                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded"
                                      disabled={
                                        item?.quantity >= item.productId?.stock
                                      }
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>

                                <td className="text-right py-4">
                                  <div className="flex space-x-1 items-center justify-center">
                                    <span className="text-[15px] font-normal">
                                      {formatPrice(calculateTotalPrice(item))}
                                    </span>
                                  </div>
                                </td>

                                <td className="text-right py-4">
                                  <div className="flex space-x-1 items-center p-5 justify-center">
                                    <span
                                      onClick={() =>
                                        onHandleRemove(item.productId._id)
                                      }
                                      className="cursor-pointer hover:text-red-500"
                                    >
                                      <svg
                                        width="10"
                                        height="10"
                                        viewBox="0 0 10 10"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="fill-current"
                                      >
                                        <path d="M9.7 0.3C9.3 -0.1 8.7 -0.1 8.3 0.3L5 3.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L3.6 5L0.3 8.3C-0.1 8.7 -0.1 9.3 0.3 9.7C0.7 10.1 1.3 10.1 1.7 9.7L5 6.4L8.3 9.7C8.7 10.1 9.3 10.1 9.7 9.7C10.1 9.3 10.1 8.7 9.7 8.3L6.4 5L9.7 1.7C10.1 1.3 10.1 0.7 9.7 0.3Z" />
                                      </svg>
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            );
                            
                          })
                        )}
                      </tbody>
                    </table>
                     
                  </div>
                </div>
              
              </div>
              {/* ke thuc Chinh sua */}
              <div className="w-full mt-[30px] flex justify-between">
              <div className="flex justify-start">
              <button
              onClick={handleClearCart}
              className="h-[50px] px-4 black-btn flex justify-center items-center text-sm font-semibold hover:bg-gray-700"
            >
              Xóa Giỏ hàng
            </button>
              </div>
              <div className="sm:w-[370px] w-full border border-[#EDEDED] px-[30px] py-[26px]">
                <div className="total mb-6">
                  <div className="flex justify-between">
                    <p className="text-[18px] font-medium text-qblack">Total</p>
                    <p className="text-[18px] font-medium text-qred">
                      {formatPrice(totalPrice)}
                    </p>
                  </div>
                </div>
                {data.products.length > 0 && totalPrice > 0 ? (
                  <>
                    <button
                      onClick={() => onSubmit()}
                      disabled={isLoadingItem}
                      className="w-full h-[50px] black-btn flex justify-center items-center text-sm font-semibold"
                    >
                      Thanh toán online
                    </button>
                    <Link to="/checkout">
                      <div className={`mt-4 w-full h-[50px] black-btn flex justify-center items-center ${totalPrice > 50000000 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <span className="text-sm font-semibold">Trả tiền khi nhận hàng</span>
                      </div>
                    </Link>
                  </>
                ) : (
                  <div className="w-full h-[50px] black-btn flex justify-center items-center text-sm font-semibold opacity-50 cursor-not-allowed">
                    Không có sản phẩm để thanh toán
                  </div>
                )}
              </div>
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CartPage;