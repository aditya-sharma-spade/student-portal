import AppDatasource from "../db/datasource.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userRepo = AppDatasource.getRepository("User");

export const registerUser = async(req,res)=>{
  
    try{
const hashedPassword =
    await bcrypt.hash(req.body.password,10);
        const user = await userRepo.save({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:hashedPassword
        });

        res.status(201).json({
            message:"User registered successfully",
            user
        });

    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
}
export const loginUser = async(req,res)=>{
   try{
    const email= req.body.email
    const password= req.body.password
     const user = await userRepo.findOneBy({ email });  

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
     const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }
        const token= jwt.sign(
        {
            userid: user.id,
            email:user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn : "1h"
        }
        )
        res.status(200).json(
            {
                message: "Login succcessful",
                token
            }  
        )
   }
   catch(error){
       res.status(500).json({
            message: error.message
        });
   }
}
