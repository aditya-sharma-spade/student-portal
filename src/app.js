import express from "express"
import userRoute from "./routes/user.routes.js"
const app = express();
app.use(express.json());
app.use("/users",userRoute)



export default app