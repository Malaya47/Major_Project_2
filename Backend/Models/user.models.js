const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  postTextContent: { type: String },
  postImage: { type: String },
  likes: { type: Number, default: 0 },
  liked: { type: Boolean, default: false },
  date: { type: String },
  comments: [
    {
      name: String,
      profileImage: String,
      commnetText: String,
    },
  ],
});

const followerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    userName: {
      type: String,
    },
    bio: {
      type: String,
    },
    profileLink: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    followers: [followerSchema],
    following: [followerSchema],
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

module.exports = { User, Post };
