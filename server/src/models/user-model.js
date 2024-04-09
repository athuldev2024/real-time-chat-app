import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  password: { type: String },
  hashed: { type: String },
  mobile: { type: Number, unique: true },
});

export default mongoose.model("UserDB", userSchema);
