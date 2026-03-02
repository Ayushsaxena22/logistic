require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const cors = require("cors");

const app=express();
app.use(cors());
const userRoutes=require("./auth/auth.routes.js");
const orderRoutes = require("./order/order.routes.js");

app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("mongodb connected"))
.catch(err=>console.log(err));
app.use("/api",userRoutes);
app.use("/api/orders", orderRoutes);
module.exports=app;


