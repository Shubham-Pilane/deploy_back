const express=require("express")
const {UserModel}=require("../model/user.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const userRouter=express.Router()


userRouter.get("/",(req,res)=>{
    res.send("This is a home page")
})

//for register new user

userRouter.post("/register",async(req,res)=>{
   
    const{name,email,password,city,age}=req.body
    try {  
        const user= await UserModel.findOne({email})
        if(user)
        {
          res.status(200).send("user already exists!!")
        }
        else{
            bcrypt.hash(password,5,async(err,hash)=>{
                const user=new UserModel({name,email,city,age,password:hash})
                await user.save()
                res.status(200).send({"msg":"New user has been register"})
            })
        }
       
    } catch (err) {
        res.status(400).send({"err":err.message})
    }
})


// for login 

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        
        const user= await UserModel.findOne({email})
        if(user)
        {
            bcrypt.compare(password,user.password,(err,result)=>{

                if(result)
                {
                    const token=jwt.sign({userID:user._id,user:user.name},"Shubham")
                    res.status(200).send({"msg":"Login sucessfull","token":token})
                }
                else{
                    res.status(200).send({"msg":"Wrong email or password"})
                }
            })
        }
        else{
            res.status(200).send({"msg":"Please login first !!"})
        }
    } catch (err) {
        res.status(400).send({"err":err.message})
    }
})

module.exports={
    userRouter
}
