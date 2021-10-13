import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    "productID": {type: String},
    "name": {type: String},
    "catagory": {type: String},
    "brand": {type: String},
    "maxPrice": {type: Number},
    "currentPrice": {type: Number},
    "image": {type: String}
});

const products = new mongoose.model("products", productsSchema);

export default products;