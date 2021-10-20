import products from "../models/products.js";

const patchItems = (req, res)=>{
    const {ids} = req.body;

    if(ids){
        products.find({"_id": {$in: ids}}, (err, docs)=>{
            if(err){
                return res.status(501).json({msg: "internal server error"});
            }
            if(docs){
                return res.json(docs);
            }
        })
    }
}

export default patchItems;