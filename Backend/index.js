require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs");

const corsOptions = {
  origin: "*",
  Credentials: true,
};

// initialising database
const { intializeDatabase } = require("./db/db.connect");
// export models here
const { User, Post } = require("./Models/user.models");

app.use(express.json());
app.use(cors(corsOptions));

// calling db
intializeDatabase();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer for file handling
const upload = multer({ dest: "uploads/" });

// Endpoint to handle image upload
app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path; // Path to the uploaded file

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(filePath);

    // Delete the local file after uploading to Cloudinary
    fs.unlinkSync(filePath);

    // Return the Cloudinary URL to the client
    res.status(200).json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

app.get("/", (req, res) => {
  res.send("Express server");
});

// for posting users
app.post("/user/postUser", async (req, res) => {
  try {
    const user = req.body;
    const newUser = new User(user);
    const saveUser = await newUser.save();
    if (saveUser) {
      res.status(200).json({ message: "User saved successfully", saveUser });
    } else {
      res.status(400).json({ error: "User not saved" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to create a user", error });
  }
});

// for making a post and storing it in the user posts array
app.post("/:userId/post", async (req, res) => {
  try {
    const userId = req.params.userId;

    const post = req.body;

    const newPost = new Post(post);
    const savedPost = await newPost.save();

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { posts: savedPost._id },
      },
      { new: true }
    );

    res
      .status(201)
      .json({ message: "Post created successfully", post: savedPost, user });
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
});

// for storing the posts in the user bookmarks array
app.post("/:userId/post/:postId/bookmark", async (req, res) => {
  try {
    const userId = req.params.userId;
    const postId = req.params.postId;

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { bookmarks: postId } },
      { new: true }
    );

    if (user) {
      res.status(200).json({ messsage: "Post bookmarked", postId });
    } else {
      res.status(404).json({ messsage: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to bookmark a post", error });
  }
});

// for making post likes update
app.post("/posts/like/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $inc: { likes: 1 },
        liked: true,
      },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post liked", post });
  } catch (error) {
    res.status(500).json({ message: "Error liking post", error });
  }
});

// for making post unlike update
app.post("/posts/unlike/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;

    const post = await Post.findById(postId);

    if (post.likes > 0) {
      const post = await Post.findByIdAndUpdate(
        postId,
        {
          $inc: { likes: -1 },
          liked: false,
        },
        { new: true }
      );

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json({ message: "Post disliked", post });
    } else {
      res.status(400).json({ message: "Likes cannot be less than 0" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error liking post", error });
  }
});

// for getting all the posts
app.get("/users/posts", async (req, res) => {
  try {
    const allPosts = await Post.find().populate(
      "userId",
      "name userName profileImage"
    );
    if (allPosts.length >= 0) {
      res.status(200).json({ message: "All users post found", allPosts });
    } else {
      res.status(404).json({ message: "No posts found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to get all posts", error });
  }
});

// for getting user posts only
app.get("/user/:userId/posts", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate("posts");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User posts found", posts: user.posts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user's posts", error });
  }
});

// for getting all bookmarked posts
app.get("/user/:userId/bookmarked/posts", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate("bookmarks");
    if (user) {
      res.status(200).json({
        message: "bookmarked posts found",
        boomkmarks: user.bookmarks,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookmarked posts", error });
  }
});

// for removing post from bookmark
app.post("/user/remove-bookmark/:userId/:postId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const postId = req.params.postId;

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { bookmarks: postId } },
      { new: true }
    ).populate("bookmarks");

    if (user) {
      res.status(200).json({
        messsage: "post removed from bookmarks",
        bookmarks: user.bookmarks,
      });
    } else {
      res.status(404).json({
        messsage: "User not found",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing post from bookmarks", error });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
