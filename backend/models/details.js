import  mongoose  from "mongoose";

const detailsSchema = new mongoose.Schema({
    "productID": {type: String},
    "description": {type: String},
    "brand": {type: String}
});

const details = new mongoose.model("details", detailsSchema);

export default details;