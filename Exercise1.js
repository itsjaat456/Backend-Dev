const fs = require("fs");

function writeLog(data){
    fs.writeFileSync("exe.txt",data);
    console.log("File create successfully");
}

function readLog(){
    return fs.readFileSync("exe.txt");
}

function countWord(){
    let c = 0;
    let s = readLog().toString();
    let arr =s.split(" ");
   return arr.length;
}
module.exports = {
    countWord
}