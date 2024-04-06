import mongoose, {Schema} from "mongoose";
import validator from "validator";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true,               //  trim: true option removes any leading or trailing spaces from the input.
            index: true               // index: true indicates that an index should be created for faster lookups based on this field.
        },
        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        coverImage: {
            type: String, // cloudinary url
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
)




export const User = mongoose.model("User", userSchema)