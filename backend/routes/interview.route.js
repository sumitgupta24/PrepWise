import express from "express"
import verifyJWT from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"
import { analyzeResume } from "../controllers/interview.controller.js"

const interviewRouter = express.Router()

interviewRouter.post("/resume", verifyJWT, upload.single("resume"), analyzeResume)

export default interviewRouter