import express from "express";
const router = express.Router();
import postRegister from "../components/PostRegister.js";
import postLogin from "../components/PostLogin.js";
//testing route
router.get("/online", (req, res)=>{
    res.json({msg: "Server is Online"});
});

//post
router.post("/register", postRegister);
router.post("/login", postLogin);


export default router;