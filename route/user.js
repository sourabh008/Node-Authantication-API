const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const User=require("../models/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
route.post("/signup",(req,res,next)=>{
    User.find({email:req.body.email}).exec().then(user=>{
        if(user.length>=1){
            res.status(409).json({
               massage:" Email already exist"
            })
        }else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    res.status(500).json({
                        error:err
                    })
                }else{
                    const user=new User({
                    _id:new mongoose.Types.ObjectId(),
                    email:req.body.email,
                    password:hash
                })
                user.save().then(resq=>{

                        res.status(200).json(resq)
                    }).catch(err=>{
                        console.log(err);
                        res.status(500).json({
                            error:err
                        })
        
                    })
        
                }
            })
           

        }
    })
    
})
route.post("/login",(req,res,next)=>{
    User.find({email:req.body.email}).exec().then(user=>{
        if(user.length<1){
            return res.status(409).json({
                error:"Auth failed"
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(errw,data)=>{
            if(errw){
                return res.status(401).json({
                    massage:"Auth failed"
                })
            }
            console.log(data)
            if(data){
              const token=  jwt.sign({email:user[0].email,
                _id:user[0]._id},process.env.JWT_KEY,
                {
                    expiresIn:"1h"
                })
            
                return res.status(200).json({
                    massage:"Auth successfl",
                    token:token
                })
            } 
        })

    }).catch(err=>{
        console.log(err)
    })

})


module.exports=route