import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User } from '../models/User.js'
dotenv.config();
const secretJWTKEY = process.env.JWT_SECRET_KEY;

const decodeTokenReturnUser = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "No token" });
        }
        const decoded = jwt.verify(token, secretJWTKEY);
        const user = await User.findById(decoded.id);
        req.user=user;
        req.decodedEmail = user.email;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}


export default decodeTokenReturnUser;