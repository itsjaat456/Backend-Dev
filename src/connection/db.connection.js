import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const url =process.env.URL;

mongoose.connect(url)
.then((data)=>{
    console.log("connect");
})
.catch((err)=>{
    console.log(err);
})

export default mongoose;