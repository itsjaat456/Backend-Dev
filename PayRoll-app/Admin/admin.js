import fs from "fs";
import { StatusCodes } from "http-status-pro-js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";


dotenv.config();
export function reg(req,res){
    let{name,email,password} = req.body;
    req.body.role = "admin";
    try{
        let salt  = bcrypt.genSaltSync(10);
        let hashpassword = bcrypt.hashSync(password,salt);
        password = hashpassword;
        let arr = [];
        let obj = {
            id:Date.now(),name,email,password
        }
        if(!name || !email || !password){
             return res.status(StatusCodes.BAD_REQUEST.code).json({
            code:StatusCodes.BAD_REQUEST.code,
            message:StatusCodes.BAD_REQUEST.message,
            data:null
        })
        }
        if(fs.existsSync("admin.json")){
            let data = JSON.parse(fs.readFileSync("admin.json","utf-8"));
            let isUser = data.find((value)=> value.email == email)
            if(isUser){
        //          return res.status(StatusCodes.CONFLICT.code).json({
        //     code:StatusCodes.CONFLICT.code,
        //     message:StatusCodes.CONFLICT.message,
        //     data:null
        // })
       return res.render("adReg",{error:"conflict data "})
    }
            arr = data;
        }
        arr.push(obj);
        fs.writeFileSync("admin.json",JSON.stringify(arr,null,2));
        // res.status(StatusCodes.CREATED.code).json({
        //     code:StatusCodes.CREATED.code,
        //     message:StatusCodes.CREATED.message,
        //     data:null
        // })
        res.redirect("/user/allemp");
    }catch(err){
        console.log(" register admin ",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}

//login
export function login(req,res){
    let{email,password} = req.body;
    
    try{
        if(!email || !password){
             return res.status(StatusCodes.BAD_REQUEST.code).json({
            code:StatusCodes.BAD_REQUEST.code,
            message:StatusCodes.BAD_REQUEST.message,
            data:null
        })
        }
        if(!fs.existsSync("admin.json")){
            return res.status(StatusCodes.NOT_FOUND.code).json({
            code:StatusCodes.NOT_FOUND.code,
            message:StatusCodes.NOT_FOUND.message,
            data:null
        })
        }
       
        let data =JSON.parse(fs.readFileSync("admin.json","utf-8"));
        let isEmp = data.find((value)=> value.email == email  )
        
         if(!isEmp){
            //   return res.status(StatusCodes.NOT_FOUND.code).json({
            //     code:StatusCodes.NOT_FOUND.code,
            //     message:StatusCodes.NOT_FOUND.message,
            //     data:null
            //     })
            return res.render("login", { error: "Invalid Email or Password" });
           }
           let checkpass = bcrypt.compareSync(password,isEmp.password);
           if(!checkpass){
            return res.render("login",{error:"password wrong"});
           }
    let token = jwt.sign({id:isEmp.id}, process.env.TOKEN,{expiresIn:"7d"})
        //     res.status(StatusCodes.OK.code).json({
        //     code:StatusCodes.OK.code,
        //     message:StatusCodes.OK.message,
        //     data: {isEmp:isEmp,token}
        // })
        res.cookie("token", token, { 
            httpOnly: true,          
            maxAge: 7 * 24 * 60 * 60 * 1000, 
        });
        res.redirect("/user/allemp");
    }catch(err){
        console.log("login admin",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}

// update 

export function updateAdmin(req,res){
    const{id,name,email} = req.body;
    try{
        if(!fs.existsSync("admin.json")){
            return res.status(StatusCodes.NOT_FOUND.code).json({
                code:StatusCodes.NOT_FOUND.code,
                message:StatusCodes.NOT_FOUND.message,
                data:null
                })
        }
        let data = JSON.parse(fs.readFileSync("admin.json","utf-8"));
        let idx = data.findIndex((value)=> value.id == id);
        if(idx===-1){
        return res.status(StatusCodes.NOT_FOUND.code).json({
            code:StatusCodes.NOT_FOUND.code,
            message:StatusCodes.NOT_FOUND.message,
            data:null
        })
        }
        data[idx].name = name;
        data[idx].email = email;
        fs.writeFileSync("admin.json",JSON.stringify(data,null,2));
         res.status(StatusCodes.OK.code).json({
            code:StatusCodes.OK.code,
            message:StatusCodes.OK.message,
            data:null
        })

    }catch(err){
        console.log("update admin",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}

//delete
export function deleteAdmin(req,res){
    const{id} = req.body;
    try{
        if(!fs.existsSync("admin.json")){
            return res.status(StatusCodes.NOT_FOUND.code).json({
                code:StatusCodes.NOT_FOUND.code,
                message:StatusCodes.NOT_FOUND.message,
                data:null
                })
        }
        let data = JSON.parse(fs.readFileSync("admin.json","utf-8"));
        let isUser = data.find((value)=> value.id === id);
        if(!isUser){
        return res.status(StatusCodes.NOT_FOUND.code).json({
            code:StatusCodes.NOT_FOUND.code,
            message:StatusCodes.NOT_FOUND.message,
            data:null
        })
        }
        let newData = data.filter((value)=> value.id!==id);
    
        fs.writeFileSync("admin.json",JSON.stringify(newData,null,2));
         res.status(StatusCodes.OK.code).json({
            code:StatusCodes.OK.code,
            message:StatusCodes.OK.message,
            data:null
        })

    }catch(err){
        console.log("delete admin",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}



