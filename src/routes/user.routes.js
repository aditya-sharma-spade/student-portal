import AppDatasource from "../db/datasource.js"
import express from "express"

const router = express.Router()

import {
  adduser,
  getStudents,
  updateStudent,
  deleteStudent
} from "../controllers/student.controller.js";
const userrepo= AppDatasource.getRepository("User")

router.post("/add", adduser);
router.get("/see", getuser);


router.patch("/update/:index", updateuser);

// router.put("/update/:index", updateuser); 
  

router.delete("/delete/:index", deleteuser);






export default router