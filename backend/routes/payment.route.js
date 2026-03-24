import express from "express"
import verifyJWT from "../middlewares/auth.middleware.js"
import { createOrder, verifyPayment } from "../controllers/payment.controller.js"



const paymentRouter = express.Router()

paymentRouter.post("/order" , verifyJWT , createOrder )
paymentRouter.post("/verify" , verifyJWT , verifyPayment )


export default paymentRouter