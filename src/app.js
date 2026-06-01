import express from "express"
import userRoute from "./routes/user.routes.js"
import cors from "cors"
const app = express();
app.use(express.json());
app.use(cors());
app.use("/users",userRoute)



export default app