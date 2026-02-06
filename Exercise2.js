const fs = require("fs");

function writeLog(data){
    fs.writeFileSync("exe1.txt",data);
    console.log("File create successfully");
}

function readLog(){
    return fs.readFileSync("exe1.txt");
}

function captilaze(){
    let s = readLog().toString();
    return s.toUpperCase();
}
function rev(){
    let s = readLog().toString();
    let s1 =s.split(" ");
    let s2 = "";
    for(let i=s1.length-1;i>=0;i--){
        s2+=s1[i]+" ";
    }
    return s2;
}

function countVowel(){
    let s = readLog().toString();
    let st =s.toLowerCase();
    let c=0;
    for(let i=0;i<st.length;i++){
        if(st[i]==="a" || st[i]==="e" || st[i]==="i" || st[i]==="o" || st[i]==="u"){
            c++;
        }
    }
    return c;
}

module.exports={
    writeLog,
    readLog,
    rev,
    countVowel,
    captilaze
}
