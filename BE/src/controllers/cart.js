import Cart from "../models/Cart.js";

export const getCartByUserId = async (req, res, next) => {
    try {
        const userId = req.user._id;
        let cart = await Cart.findOne({ userId })
            .populate({
                path: "products.productId",
                model: "Product",
            })
            .populate({
                path: "products.attributesId",
                model: "Attribute",
            })
            .populate({
                path: "products.valuesId",
                model: "ValueAttribute",
            });

        if (!cart) {
            cart = new Cart({ userId, products: [] });
            await cart.save();
        }

        return res.status(200).json({ data: cart, message: "Giỏ hàng được lấy thành công" });
    } catch (error) {
        next(error);
    }
}



export const addItemToCart = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { productId, quantity, attributesId, valuesId } = req.body;
        
        if (quantity <= 0) {
            return res.status(400).json({ message: "Số lượng phải lớn hơn 0" });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({
                userId,
                products: [{ productId, quantity, attributesId, valuesId }]
            });
        } else {
            const productIndex = cart.products.findIndex(product => 
                product.productId.toString() === productId && 
                JSON.stringify(product.attributesId) === JSON.stringify(attributesId) &&
                JSON.stringify(product.valuesId) === JSON.stringify(valuesId)
            );
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ productId, quantity, attributesId, valuesId });
            }
        }

        await cart.save();
        return res.status(200).json({ cart, message: "Đã thêm mặt hàng vào giỏ hàng thành công" });
    } catch (error) {
        next(error);
    }
}


export const removeItemFromCart = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ message: "ID sản phẩm là bắt buộc" });
        }

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
        }

        const productIndex = cart.products.findIndex(product => 
            product.productId.toString() === productId
        );
        if (productIndex === -1) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm trong giỏ hàng" });
        }

        cart.products.splice(productIndex, 1);
        await cart.save();
        return res.status(200).json({ cart, message: "Đã xóa mặt hàng khỏi giỏ hàng thành công" });
    } catch (error) {
        next(error);
    }
}

export const updateItemInCart = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { productId, quantity, attributesId, valuesId } = req.body;

        if (quantity <= 0) {
            return res.status(400).json({ message: "Số lượng phải lớn hơn 0" });
        }

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const productIndex = cart.products.findIndex(product => 
            product.productId.toString() === productId
        );
        if (productIndex === -1) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm trong giỏ hàng" });
        }

        cart.products[productIndex].quantity = quantity;
        if (attributesId) {
            cart.products[productIndex].attributesId = attributesId;
        }
        if (valuesId) {
            cart.products[productIndex].valuesId = valuesId;
        }

        await cart.save();

        const updatedCart = await Cart.findOne({ userId })
            .populate({
                path: "products.productId",
                model: "Product",
            })
            .populate({
                path: "products.attributesId",
                model: "Attribute",
            })
            .populate({
                path: "products.valuesId",
                model: "ValueAttribute",
            });

        return res.status(200).json({ data: updatedCart, message: "Mặt hàng được cập nhật vào giỏ hàng thành công" });
    } catch (error) {
        next(error);
    }
}



export const clearCart = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
        }

        cart.products = [];
        await cart.save();
        return res.status(200).json({ cart });
    } catch (error) {
        next(error);
    }
}


export const getCartCount = async (req, res, next) => {
    try {

        const userId = req.user._id;

        const cart = await Cart.findOne({ userId });
        if (!cart) {

            return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });

        }

        const count = cart.products.reduce((acc, product) => acc + product.quantity, 0);

        return res.status(200).json({ data: count });
    } catch (error) {

        next(error);

    }
}
export const getCartTotal = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ userId }).populate("products.productId").populate("products.valuesId");
        if (!cart) {
            return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
        }

        // Tính tổng giá của giỏ hàng bao gồm cả giá của valuesId
        const total = cart.products.reduce((acc, product) => {
            const productPrice = product.productId.price;
            const valuesPrice = product.valuesId.reduce((sum, value) => sum + value.price, 0);
            return acc + (productPrice + valuesPrice) * product.quantity;
        }, 0);

        return res.status(200).json({ data: total });
    } catch (error) {
        next(error);
    }
}


export const increeaseItemQuantity = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { productId } = req.body;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
        }
        const productIndex = cart.products.findIndex(product => product.productId == productId);
        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found" });
        }
        cart.products[productIndex].quantity++;
        await cart.save();
        return res.status(200).json({ cart, message: "Tăng số lượng mặt hàng thành công"});
    } catch (error) {
        next(error);
    }
}

export const decreaseItemQuantity = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { productId } = req.body;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
        }
        const productIndex = cart.products.findIndex(product => product.productId == productId);
        if (productIndex === -1) {
            return res.status(404).json({ message: "Không có sản phẩm" });
        }
        if (cart.products[productIndex].quantity === 1) {
            cart.products.splice(productIndex, 1);
        } else {
            cart.products[productIndex].quantity--;
        }
        await cart.save();
        return res.status(200).json({ cart, message: "Giảm số lượng mặt hàng thành công"});
    } catch (error) {
        next(error);
    }
}