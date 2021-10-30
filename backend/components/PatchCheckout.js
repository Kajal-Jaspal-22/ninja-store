import products from "../models/products.js";

const patchCheckout = (req, res)=>{
    const {cart, total} = req.body; 
    if(!cart){
        return res.status(401).json({msg: "invalid data"});
    }
        const ids = [];
        cart.forEach((i)=>{
            ids.push(i.id)
        });

        
        products.find({"_id": {$in: ids}}, (err, doc)=>{
            if(err){
                return res.status(401).json({msg: "invalid data"});
            }
            if(doc[0]){
                const rawData = [];
                doc.forEach((i)=>{
                    const {_id, currentPrice, maxPrice} = i;
                    const id = _id.toString();
                    const quantity = cart.filter(itm => itm.id === id)[0].quantity;
                    const total = quantity * currentPrice;
                    const maxTotal = quantity * maxPrice;
                    rawData.push({id, total, maxTotal});
                });
                let maxTotalPrice = 0;
                let totalPrice = 0;
                rawData.forEach((i)=>{
                    totalPrice = totalPrice + i.total;
                    maxTotalPrice = maxTotalPrice + i.maxTotal;
                });
                if(total){
                    return res.json({total: totalPrice});
                }else {
                    return res.json({total: totalPrice, maxTotal: maxTotalPrice});
                }
                
            }
            return res.status(401).json({msg: "invalid data"});
        })


}

export default patchCheckout;