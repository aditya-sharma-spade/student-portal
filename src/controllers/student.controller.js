import AppDatasource from "../db/datasource.js"; 
const studentrepo = AppDatasource.getRepository("Student")
export const addstudent =  async (req,res)=>{
try{
      
    await studentrepo.save({
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      phone:req.body.phone,
   
    subjects:req.body.subjects,
    userid:req.body.userid
    })
    res.status(200).json({
      message: "Student accepted successfully"

    })
}
catch(error){
    res.status(500).json({
        display: error.message
    })
}
}
export const getstudent=  async(req,res)=>{
try{
   const entries= await studentrepo.find();
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


export const updatestudent=  async(req,res)=>{  //some entry is replaced
try{ 
    const vari= req.params.index

await studentrepo.update(vari, req.body)
res.status(200).json({
   message: `id ${vari} has been updated successfuly`

}
)
}
catch(error){
 res.status(500).json({
    message: error.message
 }
 )
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
  await studentrepo.delete(vari)
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

