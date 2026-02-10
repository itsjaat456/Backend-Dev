import fs from "fs";
import { StatusCodes } from "http-status-pro-js";
import logger from "../logger/log.js";

function filtering(req,res){
    const{name} = req.params;
    try{
        if(!fs.existsSync("user.json")){
            logger("Not_found","file is not exists");
            return  res.status(StatusCodes.NOT_FOUND.code).json({
                code:StatusCodes.NOT_FOUND.code,
                message:StatusCodes.NOT_FOUND.message,
                data:null
            })
        }
        let data = JSON.parse(fs.readFileSync("user.json"));
        let arr  = data.filter((value) => value.name.toLowerCase()===name.toLowerCase());
        logger("ok","task complete Successfully");
        return res.status(200).send(arr);

    }catch(err){
        logger(err,"Internal server error");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}export default filtering;