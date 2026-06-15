
import AppDatasource from "../db/datasource.js"
import express from "express"
import {isadmin} from "../middleware/admin.middleware.js"

const router = express.Router()

import {

  getstudent,
  updatestudent,
  deletestudent,
  seemyprofile
} from "../controllers/student.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";




router.get("/see", verifyToken, isadmin, getstudent);


router.patch("/update/:index", verifyToken,isadmin,  updatestudent);

// router.put("/update/:index", updateuser); 
  

router.delete("/delete/:index", verifyToken, isadmin, deletestudent);

router.get("/seeme",verifyToken,seemyprofile)

export default router;
