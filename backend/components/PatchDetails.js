import details from "../models/details.js";

const patchDetails = (req, res)=>{
    const {productID} = req.body;

    details.find({productID}, (err, doc)=>{
        if(err){
            return res.status(501).json({msg: "internal server error"});
        }
        if(doc[0]){
            return res.json({details: doc[0]});
        }
        return res.status(404).json({msg: "product not found"});
    });
}

export default patchDetails;