import mongoose,{Schema} from "mongoose"


const reviewSchema = new Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "User Id is required."],
        immutable: true
    },
    
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: [true, "Product is required."],
        immutable: true
    },
    rating: {
        type: Number,
        required: [true, "Rating is required."],
        validate(rating) {
            if (rating < 0 && rating > 5) {
                throw new Error("Rating must be greater then 0 and less then 5.")
            }
        }
    },
    review: {
        type: String,
    },
    upVote: {
        type: Number,
        default: 0
    }
});


export const Review = new mongoose.model('Review', reviewSchema);