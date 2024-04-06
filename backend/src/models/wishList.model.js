import mongoose,{Schema} from "mongoose"



const wishListSchema = new Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "userId is required"],
        immutable: true
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: [true, "Product is required"],
        unique: [true, "Product is already in your wish List"],
        immutable: true
    },
});

export const WishList = new mongoose.model('WishList', wishListSchema);