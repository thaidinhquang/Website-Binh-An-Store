import { useTanstackMutation, useTanstackQuery } from "../../common/hooks/useTanstackQuery";
import { AuthContext } from "../Auth/core/Auth";

import { useContext, useEffect, useState } from "react";

const CheckoutPage = () => {
    const { data: cartItems, isLoading } = useTanstackQuery('cart')
    const { data: cartTotal, isLoading: isLoadingTotal } = useTanstackQuery('cart/total')
    const [isLoadingItem, setIsLoadingItem] = useState(false)
    const [items, setItems] = useState([])
    const { currentUser } = useContext(AuthContext);
    const { form, isPending, mutate } = useTanstackMutation(`orders`, "CREATE", '/checkoutsuccess');
    useEffect(() => {
        if (cartItems?.products?.length > 0) {
            setIsLoadingItem(true)
            let listItem = []
            cartItems.products.forEach(item => {
                listItem.push({
                    name: item.productId._id,
                    image: item.productId.image,
                    price: item.productId.price,
                    quantity: item.quantity
                })
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
    if (isLoading || isLoadingTotal) return <div>Loading...</div>
    return (
        <div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="checkout-main-content w-full">
                <div className="container-x mx-auto">
                    {/* <div className="w-full sm:mb-10 mb-5">
                        <div className="sm:flex sm:space-x-[18px] s">
                            <div className="sm:w-1/2 w-full mb-5 h-[70px]">
                                <a href="#">
                                    <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                                        <span className="text-[15px] font-medium">
                                            Log into your Account
                                        </span>
                                    </div>
                                </a>
                            </div>
                            <div className="flex-1 h-[70px]">
                                <a href="#">
                                    <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                                        <span className="text-[15px] font-medium">
                                            Enter Coupon Code
                                        </span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div> */}
                    <div className="w-full lg:flex lg:space-x-[30px]">
                        <div className="lg:w-1/2 w-full">
                            <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                                Billing Details
                            </h1>
                            <div className="form-area">
                                <div>
                                    <div className="sm:flex sm:space-x-5 items-center mb-6">
                                        <div className="sm:w-1/2  mb-5 sm:mb-0">
                                            <input
                                                {...form.register("name", { required: 'Name is required' })}
                                                label="Name*"
                                                placeholder="Name"
                                                className="w-full py-2 px-[12px] bg-white"
                                            />
                                            {form.formState.errors.name && <span className="text-red-500">{form.formState.errors.name.message}</span>}
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                {...form.register("phone", { required: 'Phone is required' })}
                                                label="Phone*"
                                                placeholder="Phone"
                                                className="w-full py-2 px-[12px] bg-white"
                                            />
                                            {form.formState.errors.phone && <span className="text-red-500">{form.formState.errors.phone.message}</span>}
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <input
                                            {...form.register("email", { required: 'Email is required' })}
                                            label="Email Address*"
                                            placeholder="demoemial@gmail.com"
                                            className="w-full py-2 px-[12px] bg-white"
                                        />
                                        {form.formState.errors.email && <span className="text-red-500">{form.formState.errors.email.message}</span>}
                                    </div>
                                    <div className=" mb-6">
                                        <div className="w-full">
                                            <input
                                                {...form.register("line1", { required: 'Address is required' })}
                                                label="Địa chỉ 1*"
                                                placeholder="your address here"
                                                className="w-full py-2 px-[12px] bg-white"
                                            />
                                            {form.formState.errors.line1 && <span className="text-red-500">{form.formState.errors.line1.message}</span>}
                                        </div>
                                    </div>
                                    <div className=" mb-6">
                                        <div className="w-full">
                                            <input
                                                {...form.register("line2")}
                                                label="Địa chỉ 2"
                                                placeholder="your address here"
                                                className="w-full py-2 px-[12px] bg-white"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:flex sm:space-x-5 items-center mb-6">
                                        <div className="sm:w-1/2  mb-5 sm:mb-0">
                                            <input
                                                {...form.register("country", { required: 'Country is required' })}
                                                label="Quốc gia*"
                                                placeholder="enter your country"
                                                className="w-full py-2 px-[12px] bg-white"
                                            />
                                            {form.formState.errors.country && <span className="text-red-500">{form.formState.errors.country.message}</span>}
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                {...form.register("city", { required: 'City is required' })}
                                                label="Thành phố*"
                                                placeholder="enter your city"
                                                className="w-full py-2 px-[12px] bg-white"
                                            />
                                            {form.formState.errors.city && <span className="text-red-500">{form.formState.errors.city.message}</span>}
                                        </div>
                                    </div>
                                    <div className="sm:flex sm:space-x-5 items-center mb-6">
                                        <div className="sm:w-1/2  mb-5 sm:mb-0">
                                            <input
                                                {...form.register("state", { required: 'State is required' })}
                                                label="Phường/Xã*"
                                                placeholder="enter your district"
                                                className="w-full py-2 px-[12px] bg-white"
                                            />
                                            {form.formState.errors.state && <span className="text-red-500">{form.formState.errors.state.message}</span>}
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                {...form.register("postal_code", { required: 'Postal code is required' })}
                                                label="Mã bưu điện*"
                                                placeholder="enter your postal code"
                                                className="w-full py-2 px-[12px] bg-white"
                                            />
                                            {form.formState.errors.postal_code && <span className="text-red-500">{form.formState.errors.postal_code.message}</span>}
                                        </div>
                                    </div>
                                    {/* <div className="flex space-x-2 items-center mb-10">
                                        <div>
                                            <input type="checkbox" name="" id="create" />
                                        </div>
                                        <label
                                            htmlFor="create"
                                            className="text-qblack text-[15px] select-none"
                                        >
                                            Create an account?
                                        </label>
                                    </div> */}
                                    {/* <div>
                                        <h1 className="text-2xl text-qblack font-medium mb-3">
                                            Billing Details
                                        </h1>
                                        <div className="flex space-x-2 items-center mb-10">
                                            <div>
                                                <input type="checkbox" name="" id="address" />
                                            </div>
                                            <label
                                                htmlFor="address"
                                                className="text-qblack text-[15px] select-none"
                                            >
                                                Ship to a different address
                                            </label>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                                Order Summary
                            </h1>

                            <div className="w-full px-10 py-[30px] border border-[#EDEDED]">
                                <div className="sub-total mb-6">
                                    <div className=" flex justify-between mb-5">
                                        <p className="text-[13px] font-medium text-qblack uppercase">
                                            PROduct
                                        </p>
                                        <p className="text-[13px] font-medium text-qblack uppercase">
                                            total
                                        </p>
                                    </div>
                                    <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                                </div>
                                <div className="product-list w-full mb-[30px]">
                                    <ul className="flex flex-col space-y-5">
                                        {cartItems?.products?.map((item, index) => (
                                            <li key={index}>
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <h4 className="text-[15px] text-qblack mb-2.5">
                                                            {item.productId.name}
                                                            <sup className="text-[13px] text-qgray ml-2 mt-2">
                                                                {item.quantity}
                                                            </sup>
                                                        </h4>
                                                        <img src={item.productId.image} alt="" className="w-24" />
                                                        <p className="text-[13px] text-qgray">
                                                            64GB, Black, 44mm, Chain Belt
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <span className="text-[15px] text-qblack font-medium">
                                                            {item.productId.price * item.quantity}
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                                <div className="mt-[30px]">
                                    <div className=" flex justify-between mb-5">
                                        <p className="text-[13px] font-medium text-qblack uppercase">
                                            SUBTOTAL
                                        </p>
                                        <p className="text-[15px] font-medium text-qblack uppercase">
                                            ${cartTotal}
                                        </p>
                                    </div>
                                </div>

                                <div className="w-full mt-[30px]">
                                    <div className="sub-total mb-6">
                                        <div className=" flex justify-between mb-5">
                                            <div>
                                                <span className="text-xs text-qgraytwo mb-3 block">
                                                    SHIPPING
                                                </span>
                                                <p className="text-base font-medium text-qblack">
                                                    Free Shipping
                                                </p>
                                            </div>
                                            <p className="text-[15px] font-medium text-qblack">+$0</p>
                                        </div>
                                        <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                                    </div>
                                </div>

                                <div className="mt-[30px]">
                                    <div className=" flex justify-between mb-5">
                                        <p className="text-2xl font-medium text-qblack">Total</p>
                                        <p className="text-2xl font-medium text-qred">${cartTotal}</p>
                                    </div>
                                </div>
                                <div className="shipping mt-[30px]">
                                    <ul className="flex flex-col space-y-1">
                                        {/* <li className=" mb-5">
                                            <div className="flex space-x-2.5 items-center mb-4">
                                                <div className="input-radio">
                                                    <input
                                                        type="radio"
                                                        name="price"
                                                        className="accent-pink-500"
                                                        id="transfer"
                                                    />
                                                </div>
                                                <label
                                                    htmlFor="transfer"
                                                    className="text-[18px] text-normal text-qblack"
                                                >
                                                    Direct Bank Transfer
                                                </label>
                                            </div>
                                            <p className="text-qgraytwo text-[15px] ml-6">
                                                Make your payment directly into our bank account. Please
                                                use your Order ID as the payment reference.
                                            </p>
                                        </li> */}
                                        {/* <li>
                                            <div className="flex space-x-2.5 items-center mb-5">
                                                <div className="input-radio">
                                                    <input
                                                        type="radio"
                                                        name="price"
                                                        className="accent-pink-500"
                                                        id="delivery"
                                                        checked
                                                    />
                                                </div>
                                                <label
                                                    htmlFor="delivery"
                                                    className="text-[18px] text-normal text-qblack"
                                                >
                                                    Cash on Delivery
                                                </label>
                                            </div>
                                        </li> */}
                                    </ul>
                                </div>
                                <button type="submit" disabled={isLoadingItem}
                                    className="px-8 z-30 py-2 w-full bg-black text-white relative font-semibold font-sans after:-z-20 after:absolute after:h-1 after:w-1 after:bg-gray-800 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 hover:[text-shadow:2px_2px_2px_#fda4af] text-2xl"
                                >
                                    {isPending ? "Đang Đặt Hàng..." : "Đặt Hàng"}
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