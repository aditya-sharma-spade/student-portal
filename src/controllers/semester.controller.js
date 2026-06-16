import AppDatasource from "../db/datasource.js";
const semrepo= AppDatasource.getRepository("semesterdetails")
const studentrepo= AppDatasource.getRepository("students")
export const addsemester = async(req,res)=>{
 try{
const studentid = req.body.studentid
 const semester = req.body.semester
 const gpa= req.body.gpa
if(!studentid || !semester || gpa === undefined){
   return res.status(400).json({
      message:"All fields are required"
   });
}

 if(semester < 1 || semester > 8){
   return res.status(400).json({
      message:"Invalid semester"
   });
}
if(gpa < 0 || gpa > 10){
   return res.status(400).json({
      message:"Invalid GPA"
   });
}
const student =
   await studentrepo.findOneBy({
      id: studentid
   });

if(!student){
   return res.status(404).json({
      message:"Student not found"
   });
}
 await semrepo.save({
    studentid:studentid,
    semester:semester,
    gpa:gpa
 })
 
 res.status(201).json({
   message: "Semester record registered successfully",
 })
 }
catch(error){
res.status(500).json({
    message:error.message
})
}

}

export const getsemester = async(req,res)=>{
    try{
    const studentid = req.params.studentid
    const entries= await semrepo.findBy({
studentid : studentid
})

res.status(200).json({
  entries
})
}
catch(error){
res.status(500).json({
message: error.message
})
}
}

export const updatesemrecord= async(req,res)=>{
try{
    const id= req.params.id
const { semester, gpa } = req.body;
    
   
if(semester < 1 || semester > 8){
   return res.status(400).json({
      message:"Invalid semester"
   });
}

if(gpa < 0 || gpa > 10){
   return res.status(400).json({
      message:"Invalid GPA"
   });
}
    await semrepo.update(
    id,
    req.body
)
res.status(200).json({
message:`Semester record with ${id} updated successfully`
})
}
catch(error){
res.status(500).json({
  message:error.message
})
}
}

export const deletesemrecord = async(req,res)=>{
    try
    {const id= req.params.id
    await semrepo.delete(id)
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

export const mysemester= async(req,res)=>{
   try{
      const currentstudent= await studentrepo.findOneBy({
         userid:req.user.userid
      })
      if(!currentstudent){
            return res.status(404).json({
                message: "Student not found"
            })};
            
    const entries = await semrepo.findBy({
         studentid:currentstudent.id
      })
      if(entries.length===0){
         return res.status(200).json({
            message:"Semester record not found"
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

export const getallsemester = async(req,res)=>{
   try{

      const entries =
         await semrepo.find();

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