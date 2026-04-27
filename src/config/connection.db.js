import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.URL;
mongoose.connect(url)
.then(()=>{
    console.log("DB CONNECTED");
})
.catch((err)=>{
    console.log("DB not connect", err);
})

export default mongoose;