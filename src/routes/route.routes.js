import express from "express";
import requestLogger from "../middleaware/requestLogger.middleware.js";
import { createUser, userLogin } from "../controller/user.controller.js";

const router = express.Router();

router.use(requestLogger);

router.post("/signup",createUser);
router.get("/login",userLogin)



 
export default router;