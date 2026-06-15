import AppDatasource from "../db/datasource.js"
import express from "express"
import {isadmin} from "../middleware/admin.middleware.js"

const router = express.Router()

import {

  addsemester,
  getsemester,
  updatesemrecord,
  deletesemrecord,
  mysemester,
  getallsemester
} from "../controllers/semester.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

router.post("/addsemrecord",verifyToken,isadmin,addsemester)

router.get("/getsemdetails/:studentid",verifyToken,isadmin,getsemester)

router.patch("/updatesemrecord/:id",verifyToken,isadmin, updatesemrecord)

router.delete("/deletesemrecord/:id",verifyToken,isadmin,deletesemrecord)

router.get("/mysemester",verifyToken,mysemester)

router.get("/getallsemrecords",verifyToken,isadmin,getallsemester)

export default router;