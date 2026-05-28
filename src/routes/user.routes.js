import AppDatasource from "../db/datasource.js"
import express from "express"
const router = express.Router()
const userrepo= AppDatasource.getRepository("User")

router.post("/add", async (req,res)=>{
try{
    
    await userrepo.save({
      name: req.body.name,
      age: req.body.age,
      email: req.body.email

    })
    res.status(200).json({
      message: "User accepted successfully"

    })
}
catch(error){
    res.status(500).json({
        display: error.message
    })
}
})
router.get("/see", async(req,res)=>{
try{
   const entries= await userrepo.find();
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
})


router.patch("/update/:index", async(req,res)=>{
try{ 
    const vari= req.params.index

await userrepo.update(vari, req.body)
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
})
router.put("/update/:index", async(req,res)=>{
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

router.delete("/delete/:index", async(req,res)=>{
try{
  const vari= req.params.index
  await userrepo.delete(vari)
res.status(200).json({
  message: `User with id ${vari} deleted successfully`
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






export default router