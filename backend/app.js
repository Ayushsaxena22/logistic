const express=require("express");
const mongoose=require("mongoose");
const cors = require("cors");

const app=express();
app.use(cors());
const userRoutes=require("./routes/routes.js");
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("mongodb connected"))
.catch(err=>console.log(err));
app.use("/api",userRoutes);
module.exports=app;