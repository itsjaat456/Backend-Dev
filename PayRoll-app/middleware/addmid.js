import Joi from "joi";
import { StatusCodes } from "http-status-pro-js";

function addmid(req,res,next){
    try{
        let schema = Joi.object({
            firstName:Joi.string().trim().min(3).max(200).lowercase().required(),
            LastName:Joi.string().trim().min(3).max(200).lowercase().required(),
            image:Joi.string().trim().required(),
            email:Joi.string().trim().email().min(12).max(200).lowercase(),
            mob:Joi.string().min(10).max(12),
            gender:Joi.string().min(4).max(10).required(),
            department:Joi.string().trim().min(2).max(200).required(),
            address:Joi.string().trim().min(3).max(200).lowercase(),
            salary:Joi.string().required(),
            notes:Joi.string().trim().lowercase()
        })

        const{error,value} = schema.validate(req.body);
        if(error){
            return res.status(StatusCodes.BAD_REQUEST.code).json({
                code:StatusCodes.BAD_REQUEST.code,
                message:error.message,
                data:null
            })
        }
        req.body = value;
        next();
    }catch(err){
        console.log("create mid ",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}
export default addmid;