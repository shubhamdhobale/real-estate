import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js'
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO).then(() => {
  console.log("MongoDB Connected");
}).catch((err) => {
  console.error(err);
})

app.use(express.json());
app.use('/server/user' , userRouter);
app.use('/server/auth' , authRouter);

app.listen(3000 , () => {
  console.log("Server is running on port 3000");
})

