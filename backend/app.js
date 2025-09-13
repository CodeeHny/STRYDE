import cookieParser from 'cookie-parser';
import express from 'express'

const app = express();


app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("hello world -- backend");
});

// Routes
import userRouter from './routes/user.routes.js';

app.use('/api/v1/user', userRouter);



export default app 