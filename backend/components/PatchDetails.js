import details from "../models/details.js";
import products from "../models/products.js";

const patchDetails = (req, res)=>{
    const {productID} = req.body;

    details.find({productID}, (err, doc)=>{
        if(err){
            return res.status(501).json({msg: "internal server error"});
        }
        if(doc[0]){
            products.find({productID}, (error, result)=>{
                    
                    const catagory = {catagory: result[0].catagory};

                    products.find(catagory).limit(6).exec((e, r)=>{
                        if(!e){
                            const other = r.filter(i => i.productID !== productID);
                            if(other.length === 6){
                                other.pop();
                                return res.json({details: doc[0], item: result[0], other});
                            }else {
                                return res.json({details: doc[0], item: result[0], other});
                            }
                         
                        }
                    });
            });
        }else{
            return res.status(404).json({msg: "product not found"});
        }
    });
}

export default patchDetails;