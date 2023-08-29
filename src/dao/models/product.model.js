import mongoose from "mongoose";

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

export const productModel = mongoose.model("products", productSchema);
