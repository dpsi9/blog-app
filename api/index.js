import express from "express";
import connectDB from "./db/index.js";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js"



const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello from Home")
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

app.use("/api/user",userRoute);
app.use("/api/auth",authRoute);


// app.use((err,req,res,next) => {
//     const statusCode = err.statusCode || 500;
//     const message = err.message || "Internal server error";
//     res.status(statusCode).json({
//         success:false,
//         statusCode,
//         message
//     })
// })