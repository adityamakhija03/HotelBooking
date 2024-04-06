import mongoose,{Schema} from "mongoose"

const CategorySchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      parentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',    // subcategory
      },
    }, { timestamps: true });

export const Category = mongoose.model("Category", CategorySchema)