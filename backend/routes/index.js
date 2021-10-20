import express from "express";
const router = express.Router();
import postRegister from "../components/PostRegister.js";
import postLogin from "../components/PostLogin.js";
import getProducts from "../components/GetProducts.js";
import patchProducts from "../components/PatchProducts.js";
import patchDetails from "../components/PatchDetails.js";
import patchItems from "../components/PatchItems.js";


//testing route
router.get("/online", (req, res)=>{
    res.json({msg: "Server is Online"});
});

//post
router.post("/register", postRegister);
router.post("/login", postLogin);

//patch
router.patch("/products", patchProducts);
router.patch("/details", patchDetails);
router.patch("/items", patchItems);

//get
router.get("/getproducts", getProducts);


export default router;