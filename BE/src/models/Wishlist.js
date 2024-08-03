import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const wishlistSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            addedAt: { type: Date, default: Date.now }
        }
    ]
});

wishlistSchema.plugin(mongoosePaginate);

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;