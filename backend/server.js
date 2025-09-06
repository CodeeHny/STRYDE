import dotenv from "dotenv";
import app from "./app.js";
import connectDb from "./db/db.js";

dotenv.config({ path: "./.env" });

let port = 3000

connectDb()
.then(() => {
  app.listen(port, () => { 
    console.log("app is running on port ",port);
  });
})
.catch((err)=>{
    console.log("MongoDB connection failed !!! ", err)
})
