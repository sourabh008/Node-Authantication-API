var express=require("express");
const app=express();
const mongoose=require("mongoose");
const cors=require("cors");
const bodyparser=require("body-parser");
{ useNewUrlParser: true })

app.use(cors());
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
const userroutes=require("./route/user");
app.use("/user",userroutes);
/*app.use((req,res,next)=>{
    res.json("Server Started")
})*/
app.get('/abc',(req,res)=>{
    res.send("hi")
})






module.exports=app
