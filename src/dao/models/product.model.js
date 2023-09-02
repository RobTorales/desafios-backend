import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    thumbnails:String,
    category:String,
    code:String,
    status:Boolean,
    stock:Number,
});

productSchema.plugin (mongoosePaginate);

export const productModel = mongoose.model("products", productSchema);
