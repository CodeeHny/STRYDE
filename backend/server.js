import express from 'express'
const app = express();

app.get('/', (req, res)=>{
    res.send("hello world -- backend");
});

app.listen(1000, ()=>{
    console.log("app is running on port 1000")
})