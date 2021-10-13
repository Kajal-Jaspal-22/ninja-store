import products from "../models/products.js";


const getProducts = (req, res)=>{
    products.find({}, (err, doc)=>{
        if(err){
            return console.log(err);
        }
        return res.json({doc});
    });
};

export default getProducts;