import Wishlist from "../models/Wishlist.js";
import Product from "../models/Product.js"; // Assuming you have a Product model

export const getWislistByUserId = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const page = req.query.page ? +req.query.page : 1;
        const limit = req.query.limit ? +req.query.limit : 12;

        // Fetch the wishlist for the user
        const wishlist = await Wishlist.findOne({ userId }).populate("products.productId");

        if (!wishlist || !wishlist.products.length) {
            return res.status(200).json({ data: [] });
        }

        // Extract the products array from the wishlist
        const products = wishlist.products.map(item => item.productId);

        // Calculate pagination details
        const totalDocs = products.length;
        const totalPages = Math.ceil(totalDocs / limit);
        const paginatedProducts = products.slice((page - 1) * limit, page * limit);

        // Populate the paginated products
        const populatedProducts = await Product.find({ _id: { $in: paginatedProducts } });

        // Create a paginated response
        const result = {
            docs: populatedProducts,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
            limit: limit,
            nextPage: page < totalPages ? page + 1 : null,
            page: page,
            pagingCounter: (page - 1) * limit + 1,
            prevPage: page > 1 ? page - 1 : null,
            totalDocs: totalDocs,
            totalPages: totalPages
        };

        return res.status(200).json({ data: result });
    } catch (error) {
        next(error);
    }
};

export const getProductInWishlist = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const wishlist = await Wishlist.findOne({ userId });
        if (!wishlist) {
            return res.status(200).json({ data: [] });
        }
        return res.status(200).json({ data: wishlist.products });
    } catch (error) {
        next(error);
    }
}

export const addToWishlist = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { productId } = req.body;
        const wishlist = await Wishlist.findOne({ userId });
        if (!wishlist) {
            const newWishlist = new Wishlist({ userId, products: [{ productId }] });
            await newWishlist.save();
            return res.status(201).json({ data: newWishlist });
        }
        const isExist = wishlist.products.find((product) => product.productId == productId);
        if (isExist) {
            return res.status(400).json({ message: "Sản phẩm đã tồn tại trong danh sách yêu thích" });
        }
        wishlist.products.push({ productId });
        await wishlist.save();
        return res.status(200).json({ message: "Thêm sản phẩm vào danh sách yêu thích thành công" });
    } catch (error) {
        next(error);
    }
}

export const removeFromWishlist = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { productId } = req.body;
        const wishlist = await Wishlist.findOne({ userId });
        if (!wishlist) {
            return res.status(400).json({ message: "Danh sách yêu thích không tồn tại" });
        }
        const productIndex = wishlist.products.findIndex((product) => product.productId == productId);
        if (productIndex === -1) {
            return res.status(400).json({ message: "Sản phẩm không tồn tại trong danh sách yêu thích" });
        }
        wishlist.products.splice(productIndex, 1);
        await wishlist.save();
        return res.status(200).json({ message: "Xóa sản phẩm khỏi danh sách yêu thích thành công" });
    } catch (error) {
        next(error);
    }
}

export const countWishlist = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const wishlist = await Wishlist.findOne({ userId });
        if (!wishlist) {
            return res.status(200).json({ data: 0 });
        }
        return res.status(200).json({ data: wishlist.products.length });
    } catch (error) {
        next(error);
    }
}