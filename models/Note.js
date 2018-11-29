
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const noteSchema = new Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  _groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "groups"
    }
  ],
  title: String,
  // As status has only 2 fixed values, so using enum
  status: {
    type: String,
    enum: ["Public", "Private"]
  },
  // As category has only 2 fixed values, so using enum
  category: {
    type: String,
    enum: ["Note", "Cheat Sheet"]
  },
  content: String,
  // commentIds:[{
  //     type:mongoose.Schema.Types.ObjectId,
  //     ref:'comments'
  // }],
  numberOfLikes: { type: Number, default: 0 },
  numberOfFavourites: { type: Number, default: 0 },
  tags: [String],
  timeStamp: { type: Date, default: Date.now }
});
mongoose.model("notes", noteSchema);

