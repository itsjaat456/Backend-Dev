
import  fs from "fs";
import { StatusCodes } from "http-status-pro-js";

// create 
export function createEmployee(req,res){
    const{firstName,LastName,image,email,mob,gender,department,address,salary,notes} = req.body;
    
    try{
        let arr = [];
        let obj = {
            id:Date.now(),firstName,LastName,image,email,mob,gender,department,address,joining_date:new Date(),salary,notes
        }
        if(!firstName || !LastName ||!image || !gender || !department   || !salary){
             return res.status(StatusCodes.BAD_REQUEST.code).json({
            code:StatusCodes.BAD_REQUEST.code,
            message:StatusCodes.BAD_REQUEST.message,
            data:null
        })
        }
        if(fs.existsSync("emp.json")){
            let data = JSON.parse(fs.readFileSync("emp.json","utf-8"));
            let isUser = data.find((value)=> value.firstName == firstName)
            if(isUser){
                 return res.status(StatusCodes.CONFLICT.code).json({
            code:StatusCodes.CONFLICT.code,
            message:StatusCodes.CONFLICT.message,
            data:null
        })
            }
            arr = data;
        }
        arr.push(obj);
        fs.writeFileSync("emp.json",JSON.stringify(arr,null,2));
        // res.status(StatusCodes.CREATED.code).json({
        //     code:StatusCodes.CREATED.code,
        //     message:StatusCodes.CREATED.message,
        //     data:null
        // })

        res.redirect("/user/allemp")
    }catch(err){
        console.log("create employee ",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}

// delete 
export function deleteEmp(req,res){
    const{id} = req.params;
    try{
        if(!id){
             return res.status(StatusCodes.BAD_REQUEST.code).json({
            code:StatusCodes.BAD_REQUEST.code,
            message:StatusCodes.BAD_REQUEST.message,
            data:null
        })
        }
        if(!fs.existsSync("emp.json")){
            return res.status(StatusCodes.NOT_FOUND.code).json({
            code:StatusCodes.NOT_FOUND.code,
            message:StatusCodes.NOT_FOUND.message,
            data:null
        })
        }
        let data =JSON.parse(fs.readFileSync("emp.json","utf-8"));
        let isEmp = data.find((value)=> value.id == id)
           
         if(!isEmp){
              return res.status(StatusCodes.NOT_FOUND.code).json({
                code:StatusCodes.NOT_FOUND.code,
                message:StatusCodes.NOT_FOUND.message,
                data:null
                })
           }
           let employees = data.filter((value)=> value.id !== id)
        fs.writeFileSync("emp.json",JSON.stringify(employees,null,2));
        //     res.status(StatusCodes.OK.code).json({
        //     code:StatusCodes.OK.code,
        //     message:StatusCodes.OK.message,
        //     data:null
        // })
        res.render("empUi",{employees,employees})
    }catch(err){
        console.log("update employee ",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}

//update 
export function updateEmp(req,res){
    const{id,email,mob,salary} = req.body;
    try{
        if(!id || !email || !mob || !salary){
             return res.status(StatusCodes.BAD_REQUEST.code).json({
            code:StatusCodes.BAD_REQUEST.code,
            message:StatusCodes.BAD_REQUEST.message,
            data:null
        })
        }
        if(!fs.existsSync("emp.json")){
            return res.status(StatusCodes.NOT_FOUND.code).json({
            code:StatusCodes.NOT_FOUND.code,
            message:StatusCodes.NOT_FOUND.message,
            data:null
        })
        }
        let data =JSON.parse(fs.readFileSync("emp.json","utf-8"));
        let idx = data.findIndex((value)=> value.id == id)
           
         if(idx===-1){
              return res.status(StatusCodes.NOT_FOUND.code).json({
                code:StatusCodes.NOT_FOUND.code,
                message:StatusCodes.NOT_FOUND.message,
                data:null
                })
           }
            data[idx].email = email;
            data[idx].mob = mob;
            data[idx].salary = salary;
        fs.writeFileSync("emp.json",JSON.stringify(data,null,2));
            res.status(StatusCodes.OK.code).json({
            code:StatusCodes.OK.code,
            message:StatusCodes.OK.message,
            data:null
        })
    }catch(err){
        console.log("update employee ",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}

//Search 
export function searchEmp(req,res){
    const{id} = req.body;
    try{
        if(!id){
             return res.status(StatusCodes.BAD_REQUEST.code).json({
            code:StatusCodes.BAD_REQUEST.code,
            message:StatusCodes.BAD_REQUEST.message,
            data:null
        })
        }
        if(!fs.existsSync("emp.json")){
            return res.status(StatusCodes.NOT_FOUND.code).json({
            code:StatusCodes.NOT_FOUND.code,
            message:StatusCodes.NOT_FOUND.message,
            data:null
        })
        }
        let data =JSON.parse(fs.readFileSync("emp.json","utf-8"));
        let isEmp = data.find((value)=> value.id == id)
           
         if(!isEmp){
              return res.status(StatusCodes.NOT_FOUND.code).json({
                code:StatusCodes.NOT_FOUND.code,
                message:StatusCodes.NOT_FOUND.message,
                data:null
                })
           }
            res.status(StatusCodes.OK.code).json({
            code:StatusCodes.OK.code,
            message:StatusCodes.OK.message,
            data:isEmp
        })
    }catch(err){
        console.log("update employee ",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}


//search allemployees
export function searchAll(req,res){
try{
    if(!fs.existsSync("emp.json")){
         return res.status(StatusCodes.NOT_FOUND.code).json({
            code:StatusCodes.NOT_FOUND.code,
            message:StatusCodes.NOT_FOUND.message,
            data:null
        })
    }
    let data =JSON.parse(fs.readFileSync("emp.json","utf-8"));
    
    
    res.render("empUi",{employees:data});
}catch(err){
        console.log("searchAll employee ",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}