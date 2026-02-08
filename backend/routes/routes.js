const userController=require("../controller/controller.js");
const express=require("express");
const router=express.Router();

router.post("/signup",userController.signUser);
router.post("/login",userController.logUser);

module.exports=router;