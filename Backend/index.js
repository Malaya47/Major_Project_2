const express = require("express");
const app = express();
const cors = require("cors");

const corsOptions = {
  origin: "*",
  Credentials: true,
};

// initialising database
const { intializeDatabase } = require("./db/db.connect");
// export models here
const ProfileUser = require("./Models/profileUser.models");

app.use(express.json());
app.use(cors(corsOptions));

// calling db
intializeDatabase();

app.get("/", (req, res) => {
  res.send("Express server");
});

// for posting data
app.post("/profileUser", async (req, res) => {
  try {
    const createUser = new ProfileUser(req.body);
    const saveUserProfile = await createUser.save();
    if (saveUserProfile) {
      res.status(201).json({
        message: "Profile added successfully",
        createUser: createUser,
      });
    } else {
      res
        .status(401)
        .json({ error: "An error occured while adding the profile" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occured while posting profile user" });
  }
});

// for getting userProfile data
app.get("/userProfile", async (req, res) => {
  try {
    const userProfile = await ProfileUser.findOne({ userId: "Malaya" });
    console.log(userProfile);

    if (userProfile) {
      res
        .status(200)
        .json({ message: "User Profile found", userProfile: userProfile });
    } else {
      res.status(404).json({ error: "User profile not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occured while getting profile data" });
  }
});



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Erver running on PORT ${PORT}`);
});
