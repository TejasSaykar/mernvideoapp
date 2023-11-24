import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import connectDb from './config/db.js';
import userRoute from '././routes/usersRoute.js';
import authRoute from '././routes/authRoute.js'
import videoRoute from '././routes/videosRoute.js'
import commentRoute from '././routes/commentsRoute.js'


const app = express();

// configure env
dotenv.config();

connectDb();

// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());



// Routing
app.use("/api/v1/auth/", authRoute);
app.use("/api/v1/users/", userRoute);
app.use("/api/v1/video/", videoRoute);
app.use("/api/v1/comment/", commentRoute)


app.get("/", (req, res) => {
    res.send("Hello from server");
})






const port = process.env.PORT || 8800
app.listen(port, () => {
    console.log(`SERVER IS RUNNING ON http://localhost:${port}`)
})