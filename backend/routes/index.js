import express from "express";
const router = express.Router();
import postRegister from "../components/PostRegister.js"
//testing route
router.get("/online", (req, res)=>{
    res.json({msg: "Server is Online"});
});

//post
router.post("/register", postRegister);


export default router;