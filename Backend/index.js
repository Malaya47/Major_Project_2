require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    console.log(result);
    res
      .status(200)
      .json({ imageUrl: result.secure_url, imagePublicId: result.public_id });
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
        $push: {
          posts: {
            $each: [savedPost._id],
            $position: 0,
          },
        },
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

    const post = await Post.findByIdAndUpdate(
      postId,
      { bookmarked: true },
      { new: true }
    );

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { bookmarks: postId } },
      { new: true }
    );

    if (post) {
      res.status(200).json({ messsage: "Post bookmarked", postId });
    } else {
      res.status(404).json({ messsage: "Post not found" });
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
    const user = await User.findById(userId).populate({
      path: "bookmarks",
      populate: {
        path: "userId", // This will populate the userId field inside each post
        select: "name userName profileImage", // Specify which user fields to return
      },
    });

    if (user) {
      res.status(200).json({
        message: "bookmarked posts found",
        bookmarks: user.bookmarks,
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

    const post = await Post.findByIdAndUpdate(
      postId,
      { bookmarked: false },
      { new: true }
    );

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

// for getting main user profile
app.get("/profileUser/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId)
      .populate("posts")
      .populate("bookmarks");

    if (user) {
      res.status(200).json({ message: "User found", user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch user", error });
  }
});

// for getting all users profile
app.get("/users", async (req, res) => {
  try {
    const users = await User.find().populate("posts");
    if (users.length >= 0) {
      res.status(200).json({ message: "Users found", users });
    } else {
      res.status(404).json({ message: "Users not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting users", error });
  }
});

// for getting particular user profile
app.get("/userProfile/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const user = await User.findOne({ name: name }).populate("posts");
    console.log(user);

    if (user) {
      res.status(200).json({ message: "User found", user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to get user", error });
  }
});

// for editing post
app.put("/posts/editPost/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const postTextContent = req.body.postTextContent;
    const postImage = req.body.postImage;
    const postImagePublicId = req.body.imagePublicId;
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        postTextContent: postTextContent,
        postImage: postImage,
        imagePublicId: postImagePublicId
      },
      { new: true }
    );

    if (post) {
      res.status(200).json({ message: "Post updated successfully", post });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to update post", error });
  }
});

// for deleting post
app.delete("/user/:userId/delete/posts/:postId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const postId = req.params.postId;

    // Find the post to get the image public_id
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Delete the image from Cloudinary if it exists
    if (post.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(post.imagePublicId);
      } catch (cloudinaryError) {
        console.error("Error deleting image from Cloudinary:", cloudinaryError);
      }
    }

    // Delete the post from the database
    const deletePost = await Post.findByIdAndDelete(postId);

    // Remove the post ID from the user's posts array
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { posts: postId } },
      { new: true }
    );

    if (deletePost) {
      res
        .status(200)
        .json({ message: "Post and image deleted successfully", deletePost });
    } else {
      res.status(404).json({ message: "Post deletion failed" });
    }
  } catch (error) {
    console.error("Error occurred while deleting post:", error);
    res
      .status(500)
      .json({ message: "Error occurred while deleting post", error });
  }
});

// for following/followers
app.post("/profile/:mainUserId/:userId/follow", async (req, res) => {
  try {
    const mainUserId = req.params.mainUserId;
    const userIdToFollow = req.params.userId;

    // Fetch main user and target user from the database
    const mainUser = await User.findById(mainUserId);
    const userToFollow = await User.findById(userIdToFollow);

    // Check if both users exist
    if (!mainUser || !userToFollow) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFollowing = mainUser.following.includes(userIdToFollow);

    if (isFollowing) {
      // If already following, unfollow the user
      await User.findByIdAndUpdate(mainUserId, {
        $pull: { following: userIdToFollow },
      });
      await User.findByIdAndUpdate(userIdToFollow, {
        $pull: { followers: mainUserId },
      });

      return res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      // If not following, follow the user
      await User.findByIdAndUpdate(mainUserId, {
        $push: { following: userIdToFollow },
      });
      await User.findByIdAndUpdate(userIdToFollow, {
        $push: { followers: mainUserId },
      });

      return res.status(200).json({ message: "User followed successfully" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while following/unfollowing user",
      error,
    });
  }
});

// search user
app.get("/search/user/:name", async (req, res) => {
  try {
    const name = req.params.name || ""; // Set name to an empty string if not provided

    let findUsers;

    if (name) {
      const allUsers = await User.find();
      findUsers = allUsers.filter((user) =>
        user.name.toLowerCase().includes(name.toLowerCase())
      );
    } else {
      findUsers = await User.find(); // Return all users if no name is provided
    }

    if (!findUsers.length) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json({ message: "User(s) found", findUsers });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error occurred while searching for user" });
  }
});

// Register User API
app.post("/register", async (req, res) => {
  try {
    const userDetails = req.body;
    const saltRounds = 10;

    if (!userDetails) {
      res.status(400).json({ error: "No user details given for registration" });
    }

    bcrypt.hash(userDetails.password, saltRounds, async function (err, hash) {
      // storing hash password in the DB
      userDetails.password = hash;
      const registerUser = new User(userDetails);
      const saveUser = await registerUser.save();
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occured while registering user" });
  }
});

// Log In API
app.post("/login", async (req, res) => {
  try {
    const userDetails = req.body;
    const findUser = await User.findOne({ email: userDetails.email });
    if (!findUser) {
      res
        .status(404)
        .json({ message: "User is not registered please register yourself" });
    }

    async function checkUserPassword(findUser) {
      const isMatched = await bcrypt.compare(
        userDetails.password,
        findUser.password
      );
      if (isMatched) {
        // login
        const token = jwt.sign({ admin: findUser.email }, "Malaya13", {
          expiresIn: "1h",
        });

        res
          .status(200)
          .json({ message: "Login Successfull", token: token, user: findUser });
      }
    }

    checkUserPassword(findUser);
  } catch (error) {
    res.status(500).json({ message: "An error occured while login" });
  }
});

// verify token middleware
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(401).json({ message: "No token provided." });
  }
  try {
    const decoded = jwt.verify(token, "Malaya13");

    next();
  } catch (error) {
    res.status(402).json({ message: "Invalid token" });
  }
}

// sample route to test middleware
app.get("/data", verifyToken, (req, res) => {
  res.json({ message: "Data found" });
});


// API for updating logged in profile data
app.put("/profile/updateProfile/:userId", async (req, res) => {
    try {
      const updatedUserDetails = req.body;
      const userId = req.params.userId;
      const updatedUser = await User.findByIdAndUpdate(userId, updatedUserDetails, {new: true});
      if(updatedUser){
        res.status(200).json({message: "Profile updated successfully", updatedUser});
      } else {
        res.status(404).json({message: "User not found"});
      }
    } catch (error){
      res.status(500).json({message: "Unable to update profile"});
    }
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
