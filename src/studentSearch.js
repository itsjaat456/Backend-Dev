import fs from "fs"

function studentSearch(id){
    try{
        if(fs.existsSync("student.json")){
           let data = JSON.parse(fs.readFileSync("student.json","utf-8"));
           if(!data) throw new Error("file is not exist");

           let res = data.some((value)=> value.id == id )  //arr[0].id
               if(res){
                 console.log("student data exist");
               }
               else{
                console.log("student data  not exist");
               }
        }
        else{
            console.log("file not found");
        }
    }catch(error){
        console.log(error);
    }
}
export default studentSearch;