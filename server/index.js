import mongoose from 'mongoose';
import express from 'express';
import router1 from './routes/catRoutes.js';
import router2 from './routes/userRoutes.js';
import cors from 'cors'
import cookieparser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config();
const mongoDBURL = process.env.mongoDBURL;
const FRONTEND_URL=process.env.FRONTEND_URL;

const app = express();
app.use(cors({
    origin:FRONTEND_URL ,
    credentials: true, 
}));

console.log(FRONTEND_URL);

app.use(cookieparser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'))
app.use('/cats', router1)
app.use('/user',router2)

mongoose.connect(mongoDBURL)
    .then((res) => app.listen(3000, () => {
                    console.log(`Server is running`);
    }))
    .catch((err) => console.log(err));
