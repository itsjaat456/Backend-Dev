import { StatusCodes } from "http-status-pro-js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.models.js"

async function userCreate(req,res){
    try{
        const{name,email,password,role} = req.body;
        const data = await User.findOne({email});
        if(data){
            res.status(StatusCodes.BAD_REQUEST.code).json({
                code:StatusCodes.BAD_REQUEST.code,
                message:StatusCodes.BAD_REQUEST.message,
                data:null
            })
        }
        const hashPass = bcrypt.hashSync(password,10);
        const user = new User({
            name,email,password:hashPass,role
        })

        user.save();
        res.status(StatusCodes.CREATED.code).json({
                code:StatusCodes.CREATED.code,
                message:StatusCodes.CREATED.message,
                data:null
            })
    }catch(err){
        console.log("create user ",err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}


