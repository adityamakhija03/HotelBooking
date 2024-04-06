import mongoose,{Schema} from "mongoose"

const cartSchema = new Schema({
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: [true, "userId is required."],
            immutable: true
        },
        product: {
            type: mongoose.Schema.ObjectId,
            ref: "Product",
            required:true,
            immutable: true
        },
        quantity: {
            type: Number,
            default: 1,
            require: [true, "Cart quantity is required."],
            validate(quantity) {
                if(quantity < 1) throw new Error("Cart should not be less than 1.");
            }
        },
        pricing: {
            priceWithoutDiscount: {
                type: Number,
                required: [true, "priceWithoutDiscount is required."],
                validate(price) {
                    if(price < 0) throw new Error("Price must be greater than zero.");
                }
            },
            priceAfterDiscount: {
                type: Number,
                required: [true, "priceAfterDiscount is required."],
                validate(price) {
                    if(price < 0) throw new Error("Price must be greater than zero.");
                }
            },
            discount: {
                type: Number,
                required: [true, "discount is required."],
                validate(price) {
                    if(price < 0) throw new Error("Price must be greater than zero.");
                }
            },
            discountPrice: {
                type: Number,
                required: [true, "discountPrice is required."],
                validate(price) {
                    if(price < 0) throw new Error("Price must be greater than zero.");
                }
            },
        },
        addedAt: {
            type: Date,
            required: [true, "Cart Added at is required."],
            default: Date.now
        }
    });


  
export const Cart = mongoose.model("Cart", cartSchema)