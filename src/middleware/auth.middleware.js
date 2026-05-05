import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-pro-js";

dotenv.config();

function auth(req,res,next){
    try{
        const authentic = req.headers.authorization;
        if(!auth || authentic.stratsWith(" barear")){
             res.status(StatusCodes.UNAUTHORIZED.code).json({
                code:StatusCodes.UNAUTHORIZED.code,
                message:StatusCodes.UNAUTHORIZED.message,
                data:null
            })
        }

        const token = authentic.split(" ")[1];
        const userData = jwt.verify(token,process.env.TOKEN);
        req.user = userData;
        const role =  userData.role;

    }catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
                    code:StatusCodes.INTERNAL_SERVER_ERROR.code,
                    message:StatusCodes.INTERNAL_SERVER_ERROR.message,
                    data:null
                })
    }
}
export default auth;