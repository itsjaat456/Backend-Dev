import express from "express";
import reg from "../controller/user.controller.js";

const router = express.Router();


router.post("/create",reg)
export default router;