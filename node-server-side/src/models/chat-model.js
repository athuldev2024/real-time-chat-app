import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: false },
    message: { type: String, unique: false },
    date: { type: Date, unique: false, default: Date.now() },
  },
  { _id: false }
);

const chatSchema = new mongoose.Schema({
  myid: { type: Number, unique: false },
  hisid: { type: Number, unique: false },
  myusername: { type: String, unique: false },
  hisusername: { type: String, unique: false },
  messages: [messageSchema],
});

export default mongoose.model("ChatDB", chatSchema);
