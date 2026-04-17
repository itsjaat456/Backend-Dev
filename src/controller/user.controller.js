import { StatusCodes } from "http-status-pro-js";
import User from "../models/usermodels.models.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export async function createUser(req,res){
    let{name,email,password,mob,dob,address} =req.body;

    try{
         const data =  await User.findOne({email})
         if(data){
            return res.status(StatusCodes.BAD_REQUEST.code).json({
                code:StatusCodes.BAD_REQUEST.code,
                message:StatusCodes.BAD_REQUEST.message,
                data:null
            })
         }
         let checkRegix = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
         if(!checkRegix.test(password)){
            return res.status(StatusCodes.BAD_REQUEST.code).json({
                code:StatusCodes.BAD_REQUEST.code,
                message:"password is weak",
                data:null
            })
         }
        let pass = bcrypt.hashSync(password,10);
        password = pass;
        let obj = {name,email,password,mob,dob,address};
        await User.create(obj)
           return res.status(StatusCodes.CREATED.code).json({
                code:StatusCodes.CREATED.code,
                message:StatusCodes.CREATED.message,
                data:null
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


// login 

export async function userLogin(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email })

            if (!user) {
                return res.status(StatusCodes.BAD_REQUEST.code).json({
                    code: StatusCodes.BAD_REQUEST.code,
                    message: "User not found",
                    data: null
                });
            }

            const comPass = bcrypt.compareSync(password, user.password);

            if (!comPass) {
                return res.status(StatusCodes.UNAUTHORIZED.code).json({
                    code: StatusCodes.UNAUTHORIZED.code,
                    message: "Invalid password",
                    data: null
                });
            }
            let token  = jwt.sign({id:user._id},process.env.TOKEN,{expiresIn:"7h"})
            return res.status(StatusCodes.OK.code).json({
                code: StatusCodes.OK.code,
                message: StatusCodes.OK.message,
                data: { id:user._id,token }
            });
    } catch (err) {
        console.log("login error", err);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR.code,
            message: StatusCodes.INTERNAL_SERVER_ERROR.message,
            data: null
        });
    }
}