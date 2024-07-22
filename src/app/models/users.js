import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
  },
  createdAt: String,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
