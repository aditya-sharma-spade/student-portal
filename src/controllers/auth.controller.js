import AppDatasource from "../db/datasource.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import  client  from "../utils/twilio.js"
const userRepo = AppDatasource.getRepository("User");
const studentrepo = AppDatasource.getRepository("Student")

export const registerUser = async(req,res)=>{
   const {
            name,
            email,
            phone,
            password,
            age,
            course
        } = req.body;

        if(
            !name ||
            !email ||
            !phone ||
            !password ||
            !age ||
            !course
        ){
            return res.status(400).json({
                message:
                "All fields are required"
            });
        }

        if(!email.includes("@")){
            return res.status(400).json({
                message:
                "Invalid email"
            });
        }

        if(password.length < 8){
            return res.status(400).json({
                message:
                "Password must be at least 8 characters"
            });
        }

        if(age < 16 || age > 100){
            return res.status(400).json({
                message:
                "Invalid age"
            });
        }

        const existingUser =
            await userRepo.findOneBy({
                email
            });

        if(existingUser){
            return res.status(400).json({
                message:
                "Email already registered"
            });
        }


    try{
const hashedPassword =
    await bcrypt.hash(req.body.password,10);
      

    const user = await userRepo.save({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:hashedPassword,
            role:"student"
        });

        await studentrepo.save({
            userid:user.id,
            age:req.body.age,
            course:req.body.course
        })

        res.status(201).json({
            message:"User registered successfully",
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
     if(!email || !password){
         return res.status(400).json({
            message:
            "Email and password are required"
         });
      }
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
            email:user.email,
            role:user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn : "1h"
        }
        )
        res.status(200).json(
            {
                message: "Login succcessful",
                token,
                role:user.role
            }  
        )
   }
   catch(error){
       res.status(500).json({
            message: error.message
        });
   }
}

export const changepassword = async(req,res)=>{
    try{
        const userid= req.user.userid
        const oldpassword= req.body.oldpassword
        const newpassword=req.body.newpassword
if(
   !oldpassword ||
   !newpassword
){
   return res.status(400).json({
      message:
      "All fields are required"
   });
}
if(newpassword.length < 8){
   return res.status(400).json({
      message:
      "Password must be at least 8 characters"
   });
}
if(oldpassword === newpassword){
   return res.status(400).json({
      message:
      "New password must be different"
   });
}
        const user= await userRepo.findOneBy({
          id: userid
        })
        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }
          const isMatch =
            await bcrypt.compare(
                oldpassword,
                user.password
            );

        if(!isMatch){
            return res.status(401).json({
                message:"Incorrect old password"
            });
        }
        const hashedpassword= await bcrypt.hash(
            newpassword,
            10
        )
        await userRepo.update(
            userid,
            {
                password:hashedpassword
            })
              res.status(200).json({
            message:"Password updated successfully"
    })

    }
    catch(error){
        res.status(500).json({
message:error.message

        })
    }
}

export const sendOtp = async(req,res)=>{
    try{
console.log("controller reached") //
        const phone = req.body.phone;

        await client.verify.v2
        .services(
            process.env.TWILIO_VERIFY_SERVICE_SID
        )
        .verifications.create({
            to: phone,
            channel: "sms"
        });

        res.status(200).json({
            message:"OTP sent successfully"
        });

    }
    catch(error){
        console.log(error)
        res.status(500).json({
            message:error.message
        });
    }
}

export const verifyOtp = async(req,res)=>{
    try{

        const phone =
            req.body.phone;

        const otp =
            req.body.otp;

        const verification =
            await client.verify.v2
            .services(
                process.env.TWILIO_VERIFY_SERVICE_SID
            )
            .verificationChecks.create({
                to: phone,
                code: otp
            });

        if(
            verification.status !== "approved"
        ){
            return res.status(400).json({
                message:"Invalid OTP"
            });
        }

        res.status(200).json({
            message:"OTP verified"
        });

    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
}

export const resetpassword= async(req,res)=>{
    try{
        const phone= req.body.phone
        const newpassword= req.body.newpassword
        const user= await userRepo.findOneBy({
          phone:phone
        })
if(!user){
    return res.status(404).json({
        message:"User not found"
    })}
     const hashedPassword =
            await bcrypt.hash(
                newpassword,
                10
            );

        await userRepo.update(
            user.id,
            {
                password: hashedPassword
            }
        );
        res.status(200).json({
            message:"Password reset successfully"
        })

}
catch(error){
    res.status(500).json({
        message:error.message
    })
}
    }
