import mongoose, {Schema} from "mongoose";


// const productSchema =  new Schema({
//     name: {
//       type: String,
//       required: [true, "Please Enter product Name"],
//       trim: true,
//     },
//     description: {
//       type: String,
//       required: [true, "Please Enter product Description"],
//     },
//     price: {
//       type: Number,
//       required: [true, "Please Enter product Price"],
//       maxLength: [8, "Price cannot exceed 8 characters"],
//     },
//     ratings: {
//       type: Number,
//       default: 0,
//     },
//     images: [
//       {
//         public_id: {
//           type: String,
//           required: true,
//         },
//         url: {
//           type: String,
//           required: true,
//         },
//       },
//     ],
//     category: {
//       type: String,
//       required: [true, "Please Enter Product Category"],
//     },
//     Stock: {
//       type: Number,
//       required: [true, "Please Enter product Stock"],
//       maxLength: [4, "Stock cannot exceed 4 characters"],
//       default: 1,
//     },
//     numOfReviews: {
//       type: Number,
//       default: 0,
//     },
//     reviews: [
//       {
//         user: {
//           type: mongoose.Schema.ObjectId,
//           ref: "User",
//           required: true,
//         },
//         name: {
//           type: String,
//           required: true,
//         },
//         rating: {
//           type: Number,
//           required: true,
//         },
//         comment: {
//           type: String,
//           required: true,
//         },
//       },
//     ],
  
//     user: {
//       type: mongoose.Schema.ObjectId,
//       ref: "User",
//       required: true,
//     },
// },
// {
//  timestamps:true
// }
//   );

//   export const Product = mongoose.model("Product", productSchema)


const productSchema = new Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "User Id is required."],
        immutable: true
    },
    productName: {
        type: String,
        required: [true, "Product Name is required."]
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
    stock: {
        type: Number,
        required: [true, "Stock is required."],
        validator(value) {
            if (value < 0) {
                throw new Error("Stock should not be negative")
            }
        }
    },
    category: {
        type: String,
        required: [true, "Category is required."]
    },
    description: {
        type: String,
        required: [true, "Description is required."]
    },
    images: [
        {
            public_id: {
                type: String,
                required: [true, "Image public id is required."]
            },
            url: {
                type: String,
                required: [true, "Image public url is required."]
            },
        }
    ],
    imagesList: [
        {
            public_id: {
                type: String,
                required: [true, "Image public id is required."]
            },
            url: {
                type: String,
                required: [true, "Image public url is required."]
            },
        }
    ],
    noOfVisit: {
        type: Number,
        required: [true, "Number of visit is required."],
        validator(value) {
            if (value < 0) {
                throw new Error("noOfVisit should not be negative")
            }
        },
        default: 0
    },
    postedAt: {
        type: Date,
        default: Date.now,
        required: [true, "Plant added at is required."]
    }
});

productSchema.methods.increaseVisit = async function () {
    try {
        this.noOfVisit++;
        await this.save();
    } catch (error) {
        console.log(error);
    }
}

export const Product = mongoose.model("Product", productSchema)