import products from "../models/products.js";

const patchSearchItems = (req, res)=>{
    const {searchTerm} = req.body;

    if(!searchTerm){
        return res.status(401).json({msg: "no search term found."});
    }
    products.find({brand: searchTerm.toUpperCase()}, (err, doc)=>{
        if(err) return res.status(501).json({msg: "some internal error found"});
        if(doc.length === 0){
            return res.status(404).json({msg: "no data found"});
        }
        return res.json({doc});
    })
};

export default patchSearchItems;