import express from "express"
import verifyJWT from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"
import { analyzeResume, finishInterview, generateQuestions, getInterviewReport, getMyInterviews, submitAnswer } from "../controllers/interview.controller.js"

const interviewRouter = express.Router()

interviewRouter.post("/resume", verifyJWT, upload.single("resume"), analyzeResume)
interviewRouter.post("/generate-questions", verifyJWT, generateQuestions)
interviewRouter.post("/submit-answer", verifyJWT, submitAnswer)
interviewRouter.post("/finish", verifyJWT, finishInterview)
interviewRouter.get("/get-interview", verifyJWT, getMyInterviews)
interviewRouter.get("/report/:id", verifyJWT, getInterviewReport)


export default interviewRouter