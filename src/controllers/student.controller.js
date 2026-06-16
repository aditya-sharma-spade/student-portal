
import AppDatasource from "../db/datasource.js"; 
const studentrepo = AppDatasource.getRepository("Student")
const userRepo = AppDatasource.getRepository("User")

export const getstudent=  async(req,res)=>{
try{
   const students= await studentrepo.find();
   const entries=[];

   for(const student of students){

      const user =
         await userRepo.findOneBy({
            id:student.userid
         });
if (!user || user.role !== "student") continue;
      entries.push({
         id:student.id,
         name:user?.name,
         email:user?.email,
         phone:user?.phone,
         age:student.age,
         course:student.course
      });
   }

   res.status(200).json(
      {
        message: "Done successfully",
        entries: entries
      }
   )

}
catch(error){
    res.status(500).json(
        {
            display: error.message
        }
    )
}
}


export const updatestudent = async (req, res) => {
    try {
        const vari = req.params.index;
        const { name, email, phone, age, course } = req.body;

        // Find the student first to get their userid
        const student = await studentrepo.findOneBy({ id: vari });
        if (!student) return res.status(404).json({ message: "Student not found" });

        // Fields that belong to User table
        const userFields = {};
        if (name) userFields.name = name;
        if (email) userFields.email = email;
        if (phone) userFields.phone = phone;

        // Fields that belong to Student table
        const studentFields = {};
        if (age) studentFields.age = age;
        if (course) studentFields.course = course;

        if (Object.keys(userFields).length)
            await userRepo.update(student.userid, userFields);
        
        if (Object.keys(studentFields).length)
            await studentrepo.update(vari, studentFields);

        res.status(200).json({ message: `Student ${vari} updated successfully` });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
/*router.put("/update/:index", async(req,res)=>{ //entire request is replaced
   try{
  const vari= req.params.index
  await userrepo.update(vari,req.body)
  res.status(200).json({
    message: `info for id ${vari} updated successfully`
  }
)
   }
   catch(error){
    res.status(500).json(
{
    message: error.message
}
    )
   }

})
*/
export const deletestudent =  async(req,res)=>{
try{
  const vari= req.params.index
  
  const student = await studentrepo.findOne({
      where: { id: vari }
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    await userRepo.delete(student.userid);
  
  
res.status(200).json({
  message: `Student with id ${vari} deleted successfully`
}
)
}
catch(error){
res.status(500).json(
{
    message: error.message
}
)
}
}

export const seemyprofile= async(req,res)=>{
    try{
        const currentstudent = await studentrepo.findOneBy({
             userid:req.user.userid
        })
        if(!currentstudent){
            return res.status(404).json({
                message: "Student not found"
            })
        }
        const currentuser= await userRepo.findOneBy({
          id:req.user.userid
    })
        
        
        res.status(200).json(
            {
          
            name:currentuser.name,
            email:currentuser.email,
            phone:currentuser.phone,
            age:currentstudent.age,
            course:currentstudent.course
            }
        )
    }
    catch(error){
        res.status(500).json(
        {message: error.message}
    )
    }
}

