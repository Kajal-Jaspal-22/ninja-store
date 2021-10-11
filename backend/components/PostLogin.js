import user from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const postLogin = (req, res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(401).json({msg: "fill all the details properly"});
    }
    user.find({email}, (error, doc)=>{
        if(error){
            console.log(error);
            return res.status(501).json({msg: "internal server error"});
        }
        if(doc.length === 0){
            return res.status(404).json({msg: "no user found"});
        }
        const hash = doc[0].password;

        bcrypt.compare(password, hash, (err, result)=>{
            if(err){
                console.log(err);
                return res.status(501).json({msg: "internal server error"});
            }
            if(result){
                const payload = {userId: doc[0]._id, email: doc[0].email, name: doc[0].name};
                const KEYTOKEN = process.env.KEYTOKEN;
                jwt.sign(payload, KEYTOKEN, (e, token)=>{
                    if(e){
                        console.log(e);
                        return res.status(501).json({msg: "internal server error"}); 
                    }
                    if(token){
                        return res.json({token});
                    }
                })
            }
            return res.status(401).json({msg: "invalid details"});
        })
    })
};

export default postLogin;