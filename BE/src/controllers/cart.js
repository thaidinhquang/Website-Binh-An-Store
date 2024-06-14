import Cart from "../models/Cart.js";

export const getCartByUserId = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const data = await Cart.findOne({ userId }).populate("products.productId");
        if (!data) {
            const newCart = new Cart({
                userId,
                products: []
            });
            await newCart.save();
            return res.status(200).json({ data: newCart });
        }
        return !data ? res.status(500).json({ message: "Get cart by userId failed" }) : res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
}

export const addItemToCart = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { productId, quantity } = req.body;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            const newCart = new Cart({
                userId,
                products: [{ productId, quantity }]
            });
            await newCart.save();
            return res.status(200).json({ newCart });
        }
        const productIndex = cart.products.findIndex(product => product.productId == productId);
        if (productIndex !== -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }
        await cart.save();
        return res.status(200).json({ cart });
    } catch (error) {
        next(error);
    }
}

export const removeItemFromCart = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { productId } = req.body;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const productIndex = cart.products.findIndex(product => product.productId == productId);
        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found" });
        }
        cart.products.splice(productIndex, 1);
        await cart.save();
        return res.status(200).json({ cart });
    } catch (error) {
        next(error);
    }
}

export const updateItemInCart = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { productId, quantity } = req.body;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const productIndex = cart.products.findIndex(product => product.productId == productId);
        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found" });
        }
        cart.products[productIndex].quantity = quantity;
        await cart.save();
        return res.status(200).json({ cart });
    } catch (error) {
        next(error);
    }
}

export const clearCart = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
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
            return res.status(404).json({ message: "Cart not found" });
        }
        const count = cart.products.reduce((acc, product) => acc + product.quantity, 0);
        return res.status(200).json({ count });
    } catch (error) {
        next(error);
    }
}

export const getCartTotal = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ userId }).populate("products.productId");
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const total = cart.products.reduce((acc, product) => acc + product.productId.price * product.quantity, 0);
        return res.status(200).json({ total });
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
            return res.status(404).json({ message: "Cart not found" });
        }
        const productIndex = cart.products.findIndex(product => product.productId == productId);
        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found" });
        }
        cart.products[productIndex].quantity++;
        await cart.save();
        return res.status(200).json({ cart });
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
            return res.status(404).json({ message: "Cart not found" });
        }
        const productIndex = cart.products.findIndex(product => product.productId == productId);
        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (cart.products[productIndex].quantity === 1) {
            cart.products.splice(productIndex, 1);
        } else {
            cart.products[productIndex].quantity--;
        }
        await cart.save();
        return res.status(200).json({ cart });
    } catch (error) {
        next(error);
    }
}