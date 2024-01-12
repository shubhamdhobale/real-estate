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

app.listen(3000 , () => {
  console.log("Server is running on port 3000");
})

app.use(express.json());
app.use('/server/user' , userRouter);
app.use('/server/auth' , authRouter);

app.use((err , req , res , next) => {
  const statuscode = err.statuscode || 500;
  const message = err.message || 'Internal server error';
  return res.status(statuscode).json({
    success : false,
    statuscode,
    message,
  });
});
