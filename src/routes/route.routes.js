import express from "express";
import {createUser, userLogin } from "../controller/user.controller.js";
import {createRestorant, addMenu, restaurantLogin } from "../controller/restaurant.controller.js";

import {agentLogin, createAgent }from "../controller/agent.controller.js";
import { createOrder } from "../controller/order.controller.js";
import auth from "../auth/user.auth.js";

const router = express.Router();

router.post("/reg",createUser);
router.get("/login",userLogin);
//agent
router.post("/agentCreate",createAgent)
router.get("/agentLogin",agentLogin);

//restaurant 
router.post("/restaurantSignup",createRestorant);
router.get("/restaurantLogin",restaurantLogin);

 
//order
router.post("/order",createOrder)

//addmenu
router.post("/addMenu",addMenu)


export default router;
