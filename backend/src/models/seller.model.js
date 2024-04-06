import mongoose,{Schema} from "mongoose"

const SellerSchema = new Schema ({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      products: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        }
      ],
      address: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
      },
      phoneNumber: {
        type: String,
        validate: {
          validator: function (v) {
            return /\d{10}/.test(v); // Validate as a 10-digit phone number
          },
          message: 'Please provide a valid 10-digit phone number.',
        },
      },
      website: {
        String
    },
      rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
      },
      dateJoined: {
        type: Date,
        default: Date.now,
      },
      socialMedia: {
        facebook: String,
        twitter: String,
        instagram: String,
      },
})

export const Seller = mongoose.model("Seller", SellerSchema)