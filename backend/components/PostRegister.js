import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import user from "../models/users.js";



const postRegister = (req, res)=>{
    const {email, name, password, address} = req.body;
    const KEYTOKEN = process.env.KEYTOKEN;
    if(!email || !name || !password || !address){
        return res.status(406).json({msg:"fill all the details properly", type:"client error"});
    }
    user.find({email}, (e, doc)=>{
        if(e){
            return res.status(501).json({msg:"internal server error"});
        }
        if(doc.length === 1){
            return res.status(401).json({msg: "user alredy exists."});
        }
        bcrypt.hash(password, 5, (err, hash)=>{
            if(err){
               return res.status(501).json({msg:"internal server error"});
            }
            const newUser = new user({
                name, email, address, password: hash
            });

            newUser.save((ERR, savedData)=>{
                if(ERR){
                    return res.status(401).json({mag: "unable to save user."});
                }
                if(savedData){
                    const payload = {userId: savedData._id, email: savedData.email, name: savedData.name};
                    jwt.sign(payload, KEYTOKEN, (Err, token)=>{
                        if(Err){
                            return res.status(501).json({msg:"internal server error"});
                        }
                        return res.json({msg: "User Registerd", token});
                    });
                }
            });
        })
    });
    
}

export default postRegister;