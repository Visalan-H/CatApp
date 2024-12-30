import express from 'express'
const router2 = express.Router()
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User } from '../models/User.js'
dotenv.config();
const secretJWTKEY = process.env.JWT_SECRET_KEY;
import decodeTokenReturnUser from '../middleware/decodeTokenReturnUser.js'


router2.post('/signup', async (req, res) => {
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        const token = makeToken(user._id);

        res.cookie('jwt', token, {
            httpOnly: true,  // Ensures cookie is not accessible by JavaScript
            secure: process.env.VERCEL_ENV === 'production',  // Set to true in production (Vercel uses HTTPS)
            sameSite: 'strict',  // or 'lax' if you need a more relaxed setting
            maxAge: 24 * 60 * 60 * 1000  // Cookie expiration time (1 day)
        });


        res.status(201).json(user);
    } catch (error) {
        console.log(error);
    }
})

router2.post('/login', async (req, res) => {
    try {
        const user = await User.login(req.body.email, req.body.password);
        const token = makeToken(user._id);

        res.cookie('jwt', token, {
            httpOnly: true,  // Ensures cookie is not accessible by JavaScript
            secure: process.env.VERCEL_ENV === 'production',  // Set to true in production (Vercel uses HTTPS)
            sameSite: 'strict',  // or 'lax' if you need a more relaxed setting
            maxAge: 24 * 60 * 60 * 1000  // Cookie expiration time (1 day)
        });
        
        res.json(user);

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "incorrect password" })
    }
})

router2.get('/protected', decodeTokenReturnUser, (req, res) => {
    res.json({ message: "Verified", user: req.user});
})


const makeToken = (id) => {
    return jwt.sign({ id }, secretJWTKEY);
}


export default router2;
