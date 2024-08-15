import { useTanstackMutation, useTanstackQuery } from "../../common/hooks/useTanstackQuery";
import { AuthContext } from "../Auth/core/Auth";

import { useContext, useEffect, useState } from "react";

const CheckoutPage = () => {
    const { data: cartItems, isLoading } = useTanstackQuery('cart')
    const { data: cartTotal, isLoading: isLoadingTotal } = useTanstackQuery('cart/total')
    const [isLoadingItem, setIsLoadingItem] = useState(false)
    const [items, setItems] = useState([])
    const { currentUser } = useContext(AuthContext);
    const { form, mutate } = useTanstackMutation({
        path: `orders`,
        action: "CREATE",
        navigatePage: "/checkoutsuccess",
    });

    const calculateTotalPrice = (item) => {
        const basePrice = item.productId.price * item.quantity;
        const valuesPrice = item.valuesId.reduce((total, value) => total + value.price, 0) * item.quantity;
        return basePrice + valuesPrice;
    };

    useEffect(() => {
        if (cartItems?.products?.length > 0) {
            setIsLoadingItem(true)
            let listItem = []
            cartItems.products.forEach(item => {
                listItem.push({
                    productId: item.productId._id,
                    name: item.productId.name,
                    image: item.productId.image,
                    price: calculateTotalPrice(item),
                    quantity: item.quantity,
                    attributesId: item.attributesId.map(attr => attr._id), // Changed to only include _id
                valuesId: item.valuesId.map(value => value._id),})
            })
            setItems(listItem)
            setIsLoadingItem(false)
        }
    }, [cartItems])
    useEffect(() => {
        if (currentUser) {
            form.reset(currentUser)
        }
    }, [currentUser])
    const onSubmit = (formData) => {
        const data = {
            userId: currentUser._id,
            items: items,
            customerInfo: {
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
            },
            shippingAddress: {
                line1: formData.line1,
                line2: formData.line2,
                state: formData.state,
                city: formData.city,
                country: formData.country,
                postal_code: formData.postal_code,
            },
        }
        mutate(data)
    }
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND'
        }).format(price);
      };

    
    if (isLoading || isLoadingTotal) return <div>Loading...</div>
    return (
        <div className="bg-gray-100 min-h-screen py-10">
            <form onSubmit={form.handleSubmit(onSubmit)} className="checkout-main-content w-full max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <div className="container-x mx-auto">
                    <div className="w-full lg:flex lg:space-x-8">
                        <div className="lg:w-1/2 w-full">
                            <h1 className="sm:text-2xl text-xl text-gray-800 font-semibold mb-5">
                            Chi tiết thanh toán
                            </h1>
                            <div className="form-area">
                                <div>
                                    <div className="sm:flex sm:space-x-5 items-center mb-6">
                                        <div className="sm:w-1/2 mb-5 sm:mb-0">
                                            <input
                                                {...form.register("name", { required: 'Name is required' })}
                                                placeholder="Tên*"
                                                className="w-full py-2 px-4 bg-gray-50 border border-gray-300 rounded-md"
                                            />
                                            {form.formState.errors.name && <span className="text-red-500">{form.formState.errors.name.message}</span>}
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                {...form.register("phone", { required: 'Phone is required' })}
                                                placeholder="Số điện thoại*"
                                                className="w-full py-2 px-4 bg-gray-50 border border-gray-300 rounded-md"
                                            />
                                            {form.formState.errors.phone && <span className="text-red-500">{form.formState.errors.phone.message}</span>}
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <input
                                            {...form.register("email", { required: 'Email is required' })}
                                            placeholder="Địa chỉ email*"
                                            className="w-full py-2 px-4 bg-gray-50 border border-gray-300 rounded-md"
                                        />
                                        {form.formState.errors.email && <span className="text-red-500">{form.formState.errors.email.message}</span>}
                                    </div>
                                    <div className="mb-6">
                                        <div className="w-full">
                                            <input
                                                {...form.register("line1", { required: 'Address is required' })}
                                                placeholder="Địa chỉ 1*"
                                                className="w-full py-2 px-4 bg-gray-50 border border-gray-300 rounded-md"
                                            />
                                            {form.formState.errors.line1 && <span className="text-red-500">{form.formState.errors.line1.message}</span>}
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <div className="w-full">
                                            <input
                                                {...form.register("line2")}
                                                placeholder="Địa chỉ 2"
                                                className="w-full py-2 px-4 bg-gray-50 border border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:flex sm:space-x-5 items-center mb-6">
                                        <div className="sm:w-1/2 mb-5 sm:mb-0">
                                            <input
                                                {...form.register("country", { required: 'Country is required' })}
                                                placeholder="Quốc gia*"
                                                className="w-full py-2 px-4 bg-gray-50 border border-gray-300 rounded-md"
                                            />
                                            {form.formState.errors.country && <span className="text-red-500">{form.formState.errors.country.message}</span>}
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                {...form.register("city", { required: 'City is required' })}
                                                placeholder="Thành phố*"
                                                className="w-full py-2 px-4 bg-gray-50 border border-gray-300 rounded-md"
                                            />
                                            {form.formState.errors.city && <span className="text-red-500">{form.formState.errors.city.message}</span>}
                                        </div>
                                    </div>
                                    <div className="sm:flex sm:space-x-5 items-center mb-6">
                                        <div className="sm:w-1/2 mb-5 sm:mb-0">
                                            <input
                                                {...form.register("state", { required: 'State is required' })}
                                                placeholder="Phường/Xã*"
                                                className="w-full py-2 px-4 bg-gray-50 border border-gray-300 rounded-md"
                                            />
                                            {form.formState.errors.state && <span className="text-red-500">{form.formState.errors.state.message}</span>}
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                {...form.register("postal_code", { required: 'Postal code is required' })}
                                                placeholder="Mã bưu điện*"
                                                className="w-full py-2 px-4 bg-gray-50 border border-gray-300 rounded-md"
                                            />
                                            {form.formState.errors.postal_code && <span className="text-red-500">{form.formState.errors.postal_code.message}</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h1 className="sm:text-2xl text-xl text-gray-800 font-semibold mb-5">
                            Tóm tắt đơn hàng
                            </h1>

                            <div className="w-full px-6 py-8 border border-gray-200 bg-gray-50 rounded-lg">
                                <div className="sub-total mb-6">
                                    <div className="flex justify-between mb-5">
                                        <p className="text-sm font-medium text-gray-700 uppercase">
                                        Sản phẩm
                                        </p>
                                        <p className="text-sm font-medium text-gray-700 uppercase">
                                        Tổng
                                        </p>
                                    </div>
                                    <div className="w-full h-px bg-gray-200"></div>
                                </div>
                                <div className="product-list w-full mb-8">
                                    <ul className="flex flex-col space-y-5">
                                        {cartItems?.products?.map((item, index) => {
                                            const productAttributes = item.attributesId.map(attr => ({
                                                ...attr,
                                                values: attr.values.map(valueId =>
                                                    item.valuesId.find(value => value._id === valueId)
                                                )
                                            }));
                                            return (
                                                <li key={index}>
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <h4 className="text-base text-gray-800 mb-2.5">
                                                                {item.productId.name}
                                                                <sup className="text-sm text-gray-500 ml-2 mt-2">
                                                                    {item.quantity}
                                                                </sup>
                                                            </h4>
                                                            <img src={item.productId.image} alt="" className="w-24" />
                                                            <div>
                                                                {productAttributes.map(attr => (
                                                                    <div key={attr._id}>
                                                                        <p className="mt-2 text-gray-500 text-sm">
                                                                            {attr.name} {attr.values.map(val => val?.name).join(', ')}
                                                                        </p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <span className="text-base text-gray-800 font-medium">
                                                                {formatPrice(calculateTotalPrice(item))}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                <div className="w-full h-px bg-gray-200"></div>
                                <div className="mt-8">
                                    <div className="flex justify-between mb-5">
                                        <p className="text-sm font-medium text-gray-700 uppercase">
                                            SUBTOTAL
                                        </p>
                                        <p className="text-base font-medium text-gray-800 uppercase">
                                        {formatPrice(cartTotal)}
                                        </p>
                                    </div>
                                </div>

                                <div className="w-full mt-8">
                                    <div className="sub-total mb-6">
                                        <div className="flex justify-between mb-5">
                                            <div>
                                                <span className="text-xs text-gray-500 mb-3 block">
                                                GIAO HÀNG
                                                </span>
                                                <p className="text-base font-medium text-gray-800">
                                                Giao hàng miễn phí
                                                </p>
                                            </div>
                                            <p className="text-base font-medium text-gray-800">+0 đ</p>
                                        </div>
                                        <div className="w-full h-px bg-gray-200"></div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <div className="flex justify-between mb-5">
                                        <p className="text-2xl font-medium text-gray-800">Total</p>
                                        <p className="text-2xl font-medium text-red-600">{formatPrice(cartTotal)}</p>
                                    </div>
                                </div>
                                <div className="shipping mt-8">
                                    <ul className="flex flex-col space-y-1">
                                    </ul>
                                </div>
                                <button type="submit" disabled={isLoadingItem}
                                    className="px-8 py-2 w-full bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition duration-300"
                                >
                                    Đặt hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CheckoutPage;