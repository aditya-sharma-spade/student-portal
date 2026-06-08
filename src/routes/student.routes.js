
import AppDatasource from "../db/datasource.js"
import express from "express"
const router = express.Router()

import {
  addstudent,
  getstudent,
  updatestudent,
  deletestudent
} from "../controllers/student.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";



router.post("/add",verifyToken, addstudent);
router.get("/see", verifyToken, getstudent);


router.patch("/update/:index", verifyToken, updatestudent);

// router.put("/update/:index", updateuser); 
  

router.delete("/delete/:index", verifyToken, deletestudent);

export default router;
