import AppDatasource from "../db/datasource.js"
import express from "express"
import {isadmin} from "../middleware/admin.middleware.js"

const router = express.Router()

import {

  addrecord,
  gethosteldetails,
  updatehostelrecord,
  deletehostelrecord,
  myhostel,
  getallhostels
} from "../controllers/hostel.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

router.post("/addhostelrecord",verifyToken,isadmin,addrecord)

router.get("/gethosteldetails/:studentid",verifyToken,isadmin,gethosteldetails)

router.patch("/updatehostelrecord/:id",verifyToken,isadmin, updatehostelrecord)

router.delete("/deletehostelrecord/:id",verifyToken,isadmin,deletehostelrecord)

router.get("/myhostel",verifyToken,myhostel)

router.get("/getallhostelrecords",verifyToken,isadmin,getallhostels)

export default router;