import { StatusCodes } from "http-status-pro-js";
import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";


async function checkEmail(email){

    try{
        // abstract api for check krne k liye!!
        let url = `https://emailreputation.abstractapi.com/v1/?api_key=df96d4492bee4fec888fdfa58192e9d3&email=${email}`; 

        let response = await fetch(url);

        let data = await response.json();
       
        

       if(data.email_deliverability.status === "deliverable"){
    return true;
}else{

    return false;
}

    }catch(err){
        console.log("email check ",err);
        return false;
    }
}


export async function createUser(req,res){
        
    let {name,email,password,role} = req.body;
    try{
        let valid = await checkEmail(email);
        if(!valid){
            
            return res.status(StatusCodes.BAD_REQUEST.code).json({
                code:StatusCodes.BAD_REQUEST.code,
                message:"Invalid Email",
                data:null
            })
        }
        let exist = await User.findOne({email});

        if(exist){
            return res.status(StatusCodes.CONFLICT.code).json({
                code:StatusCodes.CONFLICT.code,
                message:"User already exists",
                data:null
            })
        }
        let pass = bcrypt.hashSync(password,10);
        password = pass;

        let obj = new User({name,email,password,role});

         sendEmail(email,"portfolio", `hii ${email.split("@")[0]}, welcome to my portfolio`);

        await obj.save()
        .then(()=>{
            return res.status(StatusCodes.CREATED.code).json({
                code:StatusCodes.CREATED.code,
                message:StatusCodes.CREATED.message,
                data:null
            })
        })
        .catch((err)=>{
            console.log(err);
        })

    }catch(err){
        console.log("create ",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}

// User login 
export async function userLogin(req,res){
    try{
        const{email, password}=req.body;
        await User.findOne({email:email})
        .then((data)=>{
            if(!data){
                return res.status(StatusCodes.BAD_REQUEST.code).json({
                    code:StatusCodes.BAD_REQUEST.code,
                    message :"user not found",
                    data:null
                });

            }
            // compare passwrod
            const comPass = bcrypt.compareSync(password,data.password);
            if(!comPass){
                return res.status(StatusCodes.BAD_REQUEST.code).json({
                    code:StatusCodes.BAD_REQUEST.code,
                    message:"Invalid password",
                    data:null
                });
            }
            // generate token
            const token =jwt.sign(
                {id:data._id},
                process.env.TOKEN,
                {expiresIn:"7d"}

            );
            return res.status(StatusCodes.OK.code).json({
                code:StatusCodes.OK.code,
                message:StatusCodes.OK.message,
                data:{
                    name:data.name,
                    id:data._id,
                    token:token

                }
            });
        })
        .catch((err)=>{
            console.log(err);
        });

    }catch(err){
        console.log("login error",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        });
    }
}

// profie get krne k liye
export async function getProfile(req,res){

    try{

        let user = await User.findById(req.user.id);

        if(!user){
            return res.status(StatusCodes.NOT_FOUND.code).json({
                code:StatusCodes.NOT_FOUND.code,
                message:"User not found",
                data:null
            })
        }

        return res.status(StatusCodes.OK.code).json({
            code:StatusCodes.OK.code,
            message:StatusCodes.OK.message,
            data:{
                name:user.name,
                email:user.email
            }
        })

    }catch(err){
        console.log("profile err ",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}

// user profile update 
export async function updateProfile(req,res){

    let {name,email} = req.body;

    try{

        let user = await User.findById(req.user.id);

        if(!user){
            return res.status(StatusCodes.NOT_FOUND.code).json({
                code:StatusCodes.NOT_FOUND.code,
                message:"User not found",
                data:null
            })
        }

        if(email){
            let exist = await User.findOne({email});

            if(exist && exist._id.toString() !== req.user.id){
                return res.status(StatusCodes.CONFLICT.code).json({
                    code:StatusCodes.CONFLICT.code,
                    message:"Email already in use",
                    data:null
                })
            }
        }

        user.name = name || user.name;
        user.email = email || user.email;

        await user.save()
        .then(()=>{
            return res.status(StatusCodes.OK.code).json({
                code:StatusCodes.OK.code,
                message:"Profile updated",
                data:null
            })
        })
        .catch((err)=>{
            console.log(err);
        })

    }catch(err){
        console.log("update err ",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}

// for user passwrod change 
export async function changePassword(req,res){

    let {oldPassword,newPassword} = req.body;

    try{

        let user = await User.findById(req.user.id);

        if(!user){
            return res.status(StatusCodes.NOT_FOUND.code).json({
                code:StatusCodes.NOT_FOUND.code,
                message:"User not found",
                data:null
            })
        }

        let check = bcrypt.compareSync(oldPassword,user.password);

        if(!check){
            return res.status(StatusCodes.BAD_REQUEST.code).json({
                code:StatusCodes.BAD_REQUEST.code,
                message:"Old password incorrect",
                data:null
            })
        }

        let pass = bcrypt.hashSync(newPassword,10);

        user.password = pass;

        await user.save()
        .then(()=>{
            return res.status(StatusCodes.OK.code).json({
                code:StatusCodes.OK.code,
                message:"Password changed",
                data:null
            })
        })
        .catch((err)=>{
            console.log(err);
        })

    }catch(err){
        console.log("password ",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}





// sendEmail by npm package
async function sendEmail(to,subject,text){

    try{

        let transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL,
                pass:process.env.Email_Pass
            }
        });

        let info = await transporter.sendMail({
            from:`"Portfolio App" <${process.env.EMAIL}>`,
            to:to,
            subject:subject,
            text:text,
            html:`<p>${text}</p>`
        });

        console.log("Message sent:", info.messageId);

        return true;

    }catch(err){
        console.log("mail error ",err);
        return false;
    }
}

export async function forgotPassword(req,res){

    let {email} = req.body;

    try{
        let user = await User.findOne({email});

        if(!user){
            return res.status(StatusCodes.NOT_FOUND.code).json({
                code:StatusCodes.NOT_FOUND.code,
                message:"User not found",
                data:null
            })
        }
        let otp = Math.floor(100000 + Math.random() * 900000).toString();
        let expiry = new Date(Date.now() + 5*60*1000); // 5 min
        user.otp = otp;
        user.otp_expiry = expiry;

        await user.save();

        await sendEmail(
            email,
            "==== OPT VERIFICATION SYSTEM ====",
            `Your OTP for the PORTFOLIO is ${otp}`
        );

        return res.status(StatusCodes.OK.code).json({
            code:StatusCodes.OK.code,
            message:"OTP sent",
            data:null
        })

    }catch(err){
        console.log("forgot ",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}


export async function verifyOtpAndReset(req,res){

    let {email,otp,newPassword} = req.body;

    try{

        let user = await User.findOne({email});

        if(!user){
            return res.status(StatusCodes.NOT_FOUND.code).json({
                code:StatusCodes.NOT_FOUND.code,
                message:"User not found",
                data:null
            })
        }

        if(user.otp !== otp){
            return res.status(StatusCodes.BAD_REQUEST.code).json({
                code:StatusCodes.BAD_REQUEST.code,
                message:"Invalid OTP",
                data:null
            })
        }

        if(new Date() > user.otp_expiry){
            return res.status(StatusCodes.BAD_REQUEST.code).json({
                code:StatusCodes.BAD_REQUEST.code,
                message:"OTP expired",
                data:null
            })
        }

        let pass = bcrypt.hashSync(newPassword,10);

        user.password = pass;
        user.otp = null;
        user.otp_expiry = null;

        await user.save();

        return res.status(StatusCodes.OK.code).json({
            code:StatusCodes.OK.code,
            message:"Password reset successful",
            data:null
        })

    }catch(err){
        console.log("otp reset ",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}