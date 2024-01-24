import express from "express";
import connectDB from "./db/index.js";
const app = express();

app.get("/",(req,res)=>{
    res.send("Hello from api")
})

connectDB()
.then(() => {
    app.listen(3000,() => {
        console.log(`server is listening on port 3000`);
    })
})
.catch((error) =>{
    console.log("MongoDB failed to connect",error);
})

