import jwt from "jsonwebtoken"
// import { User } from "../models/user.model.js";

const verifyJWT = async (req, res, next) => {
    try {
        let token = req.cookies.token;
        if(!token){
            return res.status(400).json({
                message: "User is not authenticated"
            })
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        if(!verifyToken){
            return res.status(400).json({
                message: "User is not authenticated"
            })
        }

        req.userId = verifyToken.userId

        next()
    } catch (error) {
        return res.status(500).json({
            message: "token auth error!"
        })
    }
}

export default verifyJWT