import products from "../models/products.js";

const postProducts = (req, res)=>{
    const {filter} = req.body;
    
    products.find({[filter.key]: filter.value}, (err, doc)=>{
        if(err){
            console.log(err);
            return res.status(501).json({msg: "internal server error"});
        }
        if(doc.length > 1){
            return res.json({doc});
        }
        return res.status(404).json({msg: "no products found."});
    });
    
}

export default postProducts;