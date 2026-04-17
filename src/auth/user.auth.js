import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-pro-js";

export function auth(req,res,next){
    try{
        const authentic = req.headers.authorization;
        if(!authentic || !authentic.startsWith("Bearer ")){
            return res.status(StatusCodes.UNAUTHORIZED.code).json({
                code:StatusCodes.UNAUTHORIZED.code,
                message:StatusCodes.UNAUTHORIZED.message,
                data:null
            })
        }
        let token = authentic.split(" ")[1];
        let userdata = jwt.verify(token,process.env.TOKEN);
        req.body = userdata._id;
        next();

    }catch(err){
        console.log("error in auth",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}
export default auth;