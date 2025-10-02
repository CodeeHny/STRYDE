import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors'

const app = express();


app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors())

 
// Routes
import userRouter from './routes/user.routes.js';

app.use('/api/v1/user', userRouter);



export default app 