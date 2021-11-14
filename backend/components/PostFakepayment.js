import nodemailer from "nodemailer";

const postFakepayment = (req, res)=>{
    const {email} = req.body;
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.STOREMAIL,
            pass: process.env.STOREMAILPASS
        }
    });
    
    const mailOptions = {
        from: process.env.STOREMAIL,
        to: email,
        subject: "NOT IMPORTANT",
        html: "<h1 style='color:green;'>Thank you for visiting the NINJA STORE (PROJECT).</h1>"
    }

    if(email){
        transporter.sendMail(mailOptions, (err, info)=>{
            if(!err){
                return res.json({info});
            }else return res.status(501).json({msg: "Some internal error found."})
        })
    }
};

export default postFakepayment;