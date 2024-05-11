import { NextFunction, Request,Response } from "express"
import { User } from "../model/userModel";
import { error } from "console";
import * as jwt from 'jsonwebtoken';
const secret_key:string|undefined = process.env.JWT_SECRET_KEY


export const signupSubmit = async (req:Request,res:Response) => {
  try {  
    const {email,name,password} = req.body
    const user = await User.create( {email: email,
    fullName:name,password:password}).catch((error)=>{
      console.log(error)
    })
    res.status(200).json({success:true,user})
  } catch (error) {
     return res.status(404).json({success:false,error})
  }
}

export const loginSubmit = async (req:Request,res:Response) => {
  try {
    const {email,password} = req.body;
  
     const user = await User.findOne({
      where:{
        email:email
      }
     })
     if(user?.dataValues.password === password){
       const token = jwt.sign({
        _id:user?.dataValues.userId,
        email:user?.dataValues.email
       },
       secret_key as string,
       {
        expiresIn: "1d",
       }) 

      return res.json( res.status(200).json({
          status: 200,
          success: true,
          message: "login success",
          token: token,
      }))     
     } else {
      return res.status(400).json({success:false,message:"Wrong password"})
     } 
    
  } catch (error) {
    return res.status(401).json({success:false})
  }
}

