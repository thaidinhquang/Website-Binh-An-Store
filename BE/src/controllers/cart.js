import Cart from "../models/Cart.js";
import ProductItem from "../models/ProductItem.js";

export const getCartByUserId = async (req, res, next) => {
  try {
    const userId = req.user._id;
    let cart = await Cart.findOne({ userId }).populate({
      path: "products.productId",
      model: "ProductItem",
    });

    if (!cart) {
      cart = new Cart({ userId, products: [] });
      await cart.save();
    }

    return res
      .status(200)
      .json({ data: cart, message: "Giỏ hàng được lấy thành công" });
  } catch (error) {
    next(error);
  }
};

export const addItemToCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { productId, quantity, name } = req.body;
    console.log(req.body);
    
    if (quantity <= 0) {
      return res.status(400).json({ message: "Số lượng phải lớn hơn 0" });
    }

    const product = await ProductItem.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    if (quantity > product.stock) {
      return res.status(400).json({ message: "Số lượng sản phẩm không được lớn hơn số lượng trong kho" });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({
        userId,
        products: [{ productId, quantity, name }],
      });
    } else {
      const totalProducts = cart.products.length;
      if (totalProducts >= 5) {
        return res.status(400).json({ message: "Bạn chỉ có thể thêm tối đa 5 sản phẩm vào giỏ hàng" });
      }

      const productIndex = cart.products.findIndex(
        (product) => product.productId.toString() === productId
      );
      if (productIndex !== -1) {
        const newQuantity = cart.products[productIndex].quantity + quantity;
        if (newQuantity > 5 || newQuantity > product.stock) {
          return res.status(400).json({ message: "Số lượng sản phẩm không được lớn hơn 5 hoặc số lượng trong kho" });
        }
        cart.products[productIndex].quantity = newQuantity;
      } else {
        if (quantity > 5) {
          return res.status(400).json({ message: "Bạn không được vượt quá 5 sản phẩm" });
        }
        cart.products.push({ productId, quantity, name });
      }
    }
    await cart.save();
    return res
      .status(200)
      .json({ cart, message: "Đã thêm mặt hàng vào giỏ hàng thành công" });
  } catch (error) {
    next(error);
  }
};

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

    const productIndex = cart.products.findIndex(
      (product) => product.productId.toString() === productId
    );
    if (productIndex === -1) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm trong giỏ hàng" });
    }

    cart.products.splice(productIndex, 1);
    await cart.save();
    return res
      .status(200)
      .json({ cart, message: "Đã xóa mặt hàng khỏi giỏ hàng thành công" });
  } catch (error) {
    next(error);
  }
};

export const updateItemInCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    if (quantity <= 0) {
      return res.status(400).json({ message: "Số lượng phải lớn hơn 0" });
    }

    if (quantity > 5) {
      return res.status(400).json({ message: "Số lượng sản phẩm không được lớn hơn 5" });
    }

    const product = await ProductItem.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    if (quantity > product.stock) {
      return res.status(400).json({ message: "Số lượng sản phẩm không được lớn hơn số lượng trong kho" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
    }

    const productIndex = cart.products.findIndex(
      (product) => product.productId.toString() === productId
    );
    if (productIndex === -1) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm trong giỏ hàng" });
    }

    cart.products[productIndex].quantity = quantity;
    await cart.save();

    const updatedCart = await Cart.findOne({ userId }).populate({
      path: "products.productId",
      model: "ProductItem",
    });

    return res.status(200).json({
      data: updatedCart,
      message: "Mặt hàng được cập nhật vào giỏ hàng thành công",
    });
  } catch (error) {
    next(error);
  }
};

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
};

export const getCartCount = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
    }

    const count = cart.products.reduce(
      (acc, product) => acc + product.quantity,
      0
    );

    return res.status(200).json({ data: count });
  } catch (error) {
    next(error);
  }
};
export const getCartTotal = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart) {
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
    }
    const total = cart.products.reduce(
      (acc, product) => acc + product.productId.price * product.quantity,
      0
    );
    return res.status(200).json({ data: total });
  } catch (error) {
    next(error);
  }
};

export const increeaseItemQuantity = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
    }
    const productIndex = cart.products.findIndex(
      (product) => product.productId == productId
    );
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = await ProductItem.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    if (cart.products[productIndex].quantity >= 5 || cart.products[productIndex].quantity >= product.stock) {
      return res.status(400).json({ message: "Số lượng sản phẩm không được lớn hơn 5 hoặc số lượng trong kho" });
    }

    cart.products[productIndex].quantity++;
    await cart.save();
    return res
      .status(200)
      .json({ cart, message: "Tăng số lượng mặt hàng thành công" });
  } catch (error) {
    next(error);
  }
};

export const decreaseItemQuantity = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
    }
    const productIndex = cart.products.findIndex(
      (product) => product.productId == productId
    );
    if (productIndex === -1) {
      return res.status(404).json({ message: "Không có sản phẩm" });
    }
    if (cart.products[productIndex].quantity === 1) {
      cart.products.splice(productIndex, 1);
    } else {
      cart.products[productIndex].quantity--;
    }
    await cart.save();
    return res
      .status(200)
      .json({ cart, message: "Giảm số lượng mặt hàng thành công" });
  } catch (error) {
    next(error);
  }
};