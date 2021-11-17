import express from "express";
const router = express.Router();
import getProducts from "../components/GetProducts.js";
import patchProducts from "../components/PatchProducts.js";
import patchDetails from "../components/PatchDetails.js";
import patchItems from "../components/PatchItems.js";
import patchCheckout from "../components/PatchCheckout.js";
import postFakepayment from "../components/PostFakepayment.js";
import patchSearchItems from "../components/PatchSearchItems.js";

//testing route
router.get("/online", (req, res)=>{
    res.json({msg: "Server is Online"});
});

//post
router.post("/fakepayment", postFakepayment);

//patch
router.patch("/products", patchProducts);
router.patch("/details", patchDetails);
router.patch("/items", patchItems);
router.patch("/checkout", patchCheckout);
router.patch("/search", patchSearchItems);

//get
router.get("/getproducts", getProducts);


export default router;