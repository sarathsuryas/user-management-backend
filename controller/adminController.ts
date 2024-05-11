import { Request,Response } from "express";
import { Admin } from "../model/adminModel";
import { User } from "../model/userModel";
import * as jwt from "jsonwebtoken";

const secret_key:string|undefined = process.env.JWT_SECRET_KEY;

export const signinSubmit = async (req:Request,res:Response) => {
  const {name,email,password} = req.body;
  await Admin.create({
    name:name,
    email:email,
    password:password
  }).then((data)=>{
   return res.status(200).json({success:true,data})
  }).catch((error)=>{
    console.error(error)
    return res.status(401).json({success:false,error})
  })
}

export const loginSubmit = async (req:Request,res:Response) => {
   try {
    const {email,password} = req.body;
      const admin = await Admin.findOne({
        where:{
          email:email
        }
      })
    if(admin?.dataValues.password === password) {
      const token = jwt.sign({
        _id:admin?.dataValues.id,
        email:admin?.dataValues.email
       },
       secret_key as string,
       {
        expiresIn: "1d",
       }) 

       return res.json(res.status(200).json({
          status: 200,
          success: true,
          message: "login success",
          token: token,
      }))
    }

  
   } catch (error) {
    console.error(error)
    return res.status(500).json({success:false,error})
   }
}

export const searchUser = async(req:Request,res:Response) => {
  try {
    const name = req.query.name
    
    const user = await User.findOne({
      where:{
        fullName:name
      }
    })
    if(user){
       res.status(200).json({success:true,user})
    }else{
       res.status(404).json({success:false,message:"user not found"})
    }
  } catch (error) {
    console.error(error)
    return res.status(400).json({success:true,error,message:"internal server error"})
  }
}

export const createUser = async(req:Request,res:Response) => {
      try {
        const {name,email,password} = req.body;
        const data = await User.findOne({
          where:{
            email:email
          }
        })

        if(!data) {
          const user = await User.create({
            fullName:name,
            email:email,
            password:password
          })
          res.status(200).json({success:true,user})
        } else {
          res.status(400).json({success:false,message:'user data exist'})
        }
      
      } catch (error) {
        console.error(error)
        res.status(500).json({success:false,message:"internal server error"})
      }
}

export const updateUser = async (req:Request,res:Response) => {
  try {
    const {name,email} = req.body
    const data = await User.findOne({
      where:{
        email:email
      }
    })
    if(data) {
      data.dataValues.fullName = name
      data.dataValues.email = email
       await data.save()
       res.status(200).json({success:true,message:'Updated successfully',data})
    } else {
       res.status(404).json({success:false,message:"userData not found"})
    }
  } catch (error) {
    console.error(error)
    res.status(400).json({success:false,message:"internal server error"})
  }
}

export const deleteUser = async (req:Request,res:Response)=>{
      try {
        const {email} = req.body;
        const data = await User.findOne({where:{
          email:email
        }})
        await data?.destroy()
        res.status(200).json({success:true,message:`deleted ${data?.dataValues.fullName} successfully`})
      } catch (error) {
        console.error(error)
        res.status(404).json({success:false,message:'internal Server error'})
      }
}