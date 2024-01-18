import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  avatar:{
    type: String,
    default: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg',
  },
}, { timestamps: true });


const User = mongoose.model('User' , userSchema);

export default User;