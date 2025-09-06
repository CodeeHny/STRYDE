import express from 'express'

const app = express();

app.get('/', (req, res)=>{
    res.send("hello world -- backend");
});

// Routes
import userRouter from './routes/user.routes.js';

app.use('/api/v1/user', userRouter);



export default app