import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import cors from "cors"
import userRouter from "./routes/user.route.js";
dotenv.config()

const app = express();

const PORT = process.env.PORT || 7000;

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)


app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
    connectDB()
})
