import fs from "fs";
import { StatusCodes } from "http-status-pro-js";
import logger from "../logger/log.js";

function create(req,res){
    const{name,sec,email} = req.body;

    let arr = [];
    let obj= {
        id:Date.now(),name,sec,email
    }
    try{
        if(!name || !sec ||!email){
            logger("Bad_request","input give properly")
            return res.status(StatusCodes.BAD_REQUEST.code).json({
                code:StatusCodes.BAD_REQUEST.code,
                message:StatusCodes.BAD_REQUEST.message,
                data:null
            })
        }
        if(fs.existsSync("user.json")){
            let data =   JSON.parse(fs.readFileSync("user.json","utf-8"));
            let isUser  = data.find((value)=> value.email===email);
            if(isUser){
                logger("conflict","data already exists");
                return res.status(StatusCodes.CONFLICT.code).json({
                    code:StatusCodes.CONFLICT.code,
                    message:StatusCodes.CONFLICT.message,
                    data:null
                })
            }
            arr = data;
        }
        arr.push(obj);
        fs.writeFileSync("user.json",JSON.stringify(arr,null,2));
        logger("created","file created successfully");
        res.status(StatusCodes.CREATED.code).json({
            code:StatusCodes.CREATED.code,
            message:StatusCodes.CREATED.message,
            data:"create successfully"
        })

    }catch(error){
        logger(error,"internal server error ");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data :error
        });
    }
}
export default create;