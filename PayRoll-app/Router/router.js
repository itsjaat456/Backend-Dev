import express from "express";
import addmid from "../middleware/addmid.js";
import { createEmployee,deleteEmp,searchAll,searchEmp, updateEmp } from "../modules/Employee.js";
import searchmid from "../middleware/searchmid.js";
import deletemid from "../middleware/deletemid.js";
import updatemid from "../middleware/updatemid.js";
import auth from "../auth/auth.js";
import { deleteAdmin, login, reg, updateAdmin } from "../Admin/admin.js";
import fs from "fs"

let router = express.Router();
   
router.get("/register", (req, res) => {
    res.render("adReg",{error:null});
});

//  Handle register
router.post("/admin", reg);

//  Show login page 
router.get("/login", (req, res) => {
    res.render("login");
});
router.post("/login",login);

//



router.delete("/delete/admin",deleteAdmin)
router.put("/update/admin",updateAdmin)


//emp

router.get("/addEmp", (req, res) => {
    res.render("newEmp");
})



router.post("/create",auth,addmid,createEmployee);
router.get("/search",auth,searchmid,searchEmp);
//router.delete("/delete",auth,deletemid,deleteEmp);
router.put("/update",auth, updatemid,updateEmp);
 

//search emp by name
router.post("/emps",  auth, (req, res)=>{
    let {search}   = req.body
     let data = JSON.parse(fs.readFileSync("emp.json", "utf-8"));
      let  result = data.filter((value)=> value.firstName == search.trim().toLowerCase()) || []
       res.render("empUi",{employees:result});
})


// edit employee
router.get("/edit",auth,(req,res)=>{

res.render("edit")
})

router.put("/edit", auth, (req,res)=>{
    console.log(req.body);
    res.render("/allemp")
    
}  )

router.get("/allemp",auth,searchAll);


router.get("/del/:id", (req, res) => {
    res.send("GET route working");
});

export default router;