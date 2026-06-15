import express from "express"
import studentRoute from "./routes/student.routes.js"
import cors from "cors"
import authRoutes from "./routes/auth.routes.js";
import semroutes from "./routes/semester.routes.js"
import hostelroutes from "./routes/hostel.routes.js"

const app = express();
app.use(express.json());
app.use(cors());
app.use("/students",studentRoute)

app.use("/auth", authRoutes);

app.use("/semester",semroutes);

app.use("/hostel",hostelroutes);


export default app