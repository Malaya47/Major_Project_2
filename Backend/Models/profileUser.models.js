const mongoose = require("mongoose");

const profileUser = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    userName: {
      type: String,
    },
    userBio: {
      type: String,
    },
    userLink: {
      type: String,
    },
    followers: [
      {
        user: {
          type: String,
        },
      },
    ],
    following: [
      {
        user: {
          type: String,
        },
      },
    ],
    bookmarks: [
      {
        user: {
          type: String,
        },
      },
    ],
    posts: [
      {
        userContent: {
          text: {
            type: String,
          },
          image: {
            type: String,
          },
        },
        likeCounter: {
          type: Number,
        },
        comments: {
          type: Number,
        },
        date: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const ProfileUser = mongoose.model("ProfileUser", profileUser);

module.exports = ProfileUser;
