import AppDatasource from "../db/datasource.js";
const hostelrepo= AppDatasource.getRepository("hosteldetails")
const studentrepo= AppDatasource.getRepository("students")
export const addrecord = async(req,res)=>{
 try{

const studentid = req.body.studentid
 const hostel = req.body.hostel
 const roomNumber= req.body.roomNumber
 const dateAllocated= req.body.dateAllocated
if(
   !studentid ||
   !hostel ||
   !roomNumber ||
   !dateAllocated
){
   return res.status(400).json({
      message:"All fields are required"
   });
}
 const record =
   await hostelrepo.findOneBy({
      studentid: studentid
   });
   if(record){
     return res.status(409).json({
        message:`User with student id ${studentid} already exists`
     })
   }
 await hostelrepo.save({
    studentid:studentid,
    hostel:hostel,
    roomNumber:roomNumber,
    dateAllocated:dateAllocated
 })
 
 res.status(201).json({
   message: "Hostel record registered successfully",
 })
 }
catch(error){
res.status(500).json({
    message:error.message
})
}
}

export const gethosteldetails = async(req,res)=>{
    try{
    const studentid = req.params.studentid
    const record= await hostelrepo.findOneBy({
studentid : studentid
})

res.status(200).json({
  record
})
}
catch(error){
res.status(500).json({
message: error.message
})
}
}

export const updatehostelrecord= async(req,res)=>{
try{
    const id= req.params.id
const record = await hostelrepo.findOneBy({
      id:id
   });
   if(!record){
    return res.status(404).json({
       message:"Student not found"
    })
   }
const {
   hostel,
   roomNumber,
   dateAllocated
} = req.body;

if(
   !hostel ||
   !roomNumber ||
   !dateAllocated
){
   return res.status(400).json({
      message:"All fields are required"
   });
}
    await hostelrepo.update(
    id,
    {hostel:req.body.hostel,
    roomNumber:req.body.roomNumber,
    dateAllocated:req.body.dateAllocated}
)
res.status(200).json({
message:`Hostel record with ${id} updated successfully`
})
}
catch(error){
res.status(500).json({
  message:error.message
})
}
}

export const deletehostelrecord = async(req,res)=>{
    try
    {const id= req.params.id
    const record =
   await hostelrepo.findOneBy({
      id:id
   });

if(!record){
   return res.status(404).json({
      message:"Record not found"
   });
}
        await hostelrepo.delete(id)
res.status(200).json({
 message:`Record with ${id} deleted successfully`
})
}
catch(error){
res.status(500).json({
  message:error.message
})
}
}
export const myhostel= async(req,res)=>{
   try{
      const currentstudent= await studentrepo.findOneBy({
         userid:req.user.userid
      })
      if(!currentstudent){
            return res.status(404).json({
                message: "Student not found"
            })};
            
    const entries = await hostelrepo.findOneBy({
         studentid:currentstudent.id
      })
      if(!entries){
         return res.status(200).json({
            message:"Hostel record not found"
         })
      }
      
      
res.status(200).json({
   message:"Successful",
   entries
})
}
catch(error){
   res.status(500).json({
      message:error.message
   })
}
}

export const getallhostels = async(req,res)=>{
   try{

      const entries =
         await hostelrepo.find();

      res.status(200).json({
         entries
      });

   }
   catch(error){
      res.status(500).json({
         message:error.message
      });
   }
}