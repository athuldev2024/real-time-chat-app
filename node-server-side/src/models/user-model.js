import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  password: { type: String },
  hashed: { type: String },
  mobile: { type: Number, unique: true },
  gender: { type: String, unique: true, enum: ["M", "F", "O"] },
  dob: {
    type: Date,
    unique: true,
    max: Date.now,
  },
  profilepath: { type: String, unique: true, default: "No Path" },
});

export default mongoose.model("UserDB", userSchema);
