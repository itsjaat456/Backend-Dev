import fs from "fs";

function updateStudent(id,name,classes){
    try{
        if(fs.existsSync("student.json")){
            let data = JSON.parse(fs.readFileSync("student.json","utf-8"))
            let res = data.filter((value)=>{
            if(value.id==id){
                value.name = name;
                value.classes = classes;
            }});

            fs.writeFileSync("student.json",JSON.stringify(res,null,2))
            console.log("user update ");
        }
    }
    catch(error){
        console.log(error);
    }
}