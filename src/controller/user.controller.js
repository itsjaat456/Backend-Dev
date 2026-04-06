import bcrypt from "bcrypt";
import  User from "../models/user.modes.js";
import { StatusCodes } from "http-status-pro-js";


async function reg(req,res){
    try{
        let {name,email,password}  = req.body;
        let pass = bcrypt.hashSync(password,10);
        let obj = new User({name,email,password:pass});
       const data= await obj.save();
       return res.status(StatusCodes.CREATED.code).json({
                code:StatusCodes.CREATED.code,
                message:StatusCodes.CREATED.message,
                data:data
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
export default reg;