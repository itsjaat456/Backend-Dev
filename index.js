import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import router from "./PayRoll-app/Router/router.js";
import path from "path";
import cookieParser from "cookie-parser";

dotenv.config();


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(express.static('public'));

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "PayRoll-app", "views"));


app.use("/user",router);
app.get("/",(req,res)=>{
    res.send("success")
})

let port  =process.env.PORT||8080;

app.listen(port,()=>{
    console.log("server connect");
})