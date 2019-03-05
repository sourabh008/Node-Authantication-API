var express=require("express");
const app=express();
const mongoose=require("mongoose");
const cors=require("cors");
const bodyparser=require("body-parser");
mongoose.connect("mongodb+srv://sourabh_kamboj:sou@1234@cluster0-vwdve.mongodb.net/test?retryWrites=true",
{ useNewUrlParser: true })

app.use(cors());
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
const userroutes=require("./route/user");
app.use("/user",userroutes);
app.use((req,res,next)=>{
    res.json("Server Started")
})






module.exports=app