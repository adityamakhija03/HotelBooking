import mongoose,{Schema} from "mongoose"
import validator from "validator";

const orderSchema = new Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "User Id is required."],
        immutable: true
    },
    orderItems: [
        {
            Product: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: [true, "Product is required."],
                immutable: true
            },
            
            productName: {
                type: String,
                required: [true, "Product Name is required."]
            },
            images: {
                public_id: {
                    type: String,
                    required: [true, "Image public id is required."]
                },
                url: {
                    type: String,
                    required: [true, "Image public url is required."]
                },
            },
            price: {
                type: Number,
                required: [true, "Price is required."],
                validator(value) {
                    if (value < 0) {
                        throw new Error("Price should not be negative");
                    }
                }
            },
            discount: {
                type: Number,
                required: [true, "Discount is required."],
                validator(value) {
                    if (value < 0 && value > 100) {
                        throw new Error("Discount must be greater then 0 and smaller then 100");
                    }
                }
            },
            quantity: {
                type: Number,
                required: [true, "Quantity is required."],
            },
            orderStatus: {
                status: String,
                message: String,
                statusAt: {
                    type: Date,
                    default: Date.now
                }
            },
        }
    ],
    shippingInfo: {
        name: {
            type: String,
            required: [true, "Person Name in address is required"]
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
            validate(phone) {
                if (!validator.isMobilePhone(phone, 'en-IN')) {
                    throw new Error("Invalid Phone");
                }
            }
        },
        pinCode: {
            type: String,
            required: [true, "Pin Code is required"],
            validate(pinCode) {
                if (!validator.isPostalCode(pinCode, 'IN')) {
                    throw new Error("Invalid Pin Code");
                }
            }
        },
        address: {
            type: String,
            required: [true, "Address Filed is required"]
        },
        landmark: {
            type: String,
        },
        city: {
            type: String,
            required: [true, "City is required"]
        },
        state: {
            type: String,
            required: [true, "State is required"]
        },
    },
    pricing: {
        totalPriceWithoutDiscount: {
            type: Number,
            required: [true, "totalPriceWithoutDiscount price is required."],
        },
        actualPriceAfterDiscount: {
            type: Number,
            required: [true, "totalPriceWithoutDiscount price is required."],
        },
        discountPrice: {
            type: Number,
            required: [true, "discountPrice price is required."],
        },
        deliveryPrice: {
            type: Number,
            required: [true, "Delivery price is required."],
        },
        totalPrice: {
            type: Number,
            required: [true, "Total Price is required."]
        },
    },
    orderAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    payment: {
        paymentId: {
            type: String,
            required: true,
            unique: true
        },
        status: {
            type: String,
            required: true,
            default: "pending"
        },
        message: {
            type: String,
            default: "Waiting for payment confirmation!"
        },
        paymentMethods: {
            type: String,
            required: true,
        }
    },
    delivery: {
        delivery: {
            type: mongoose.Schema.ObjectId,
            ref: "delivery",
        },
        deliveryPersonName: String,
        deliveredAt: Date,
    },
});

export const Order = new mongoose.model('Order', orderSchema);