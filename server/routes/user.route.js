const express = require("express");
const router = express.Router();
const auth = require("../controller/auth.controller");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User=require('../model/user.model')

let BASE_URL = "https://amide-one.vercel.app";
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  BASE_URL = "http://localhost:3000";
}

const buildToken = (user) => {
  return {
    userId: user._id,
    isAdmin: user.isAdmin,
  };
};

router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/google", passport.authenticate("google", ["profile", "email"]));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed",
    scope: ["email", "profile"],
    session: false,
  }),
  function (req, res) {
    const token = jwt.sign(buildToken(req.user), process.env.TOKEN_KEY);
    if (req.query.origin) {
      res.redirect(
        `${BASE_URL}/#user=${JSON.stringify({
          token,
          username: req.user.username,
          userId: req.user._id,
          isAdmin: req.user.isAdmin,
          user: req.user,
        })}`
      );
    } else {
      res.redirect(
        `${BASE_URL}/#user=${JSON.stringify({
          token,
          username: req.user.username,
          userId: req.user._id,
          isAdmin: req.user.isAdmin,
          user: req.user,
        })}`
      );
    }
  }
);

// Endpoint to fetch user profile by ID
router.get('/profile/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Find user by ID in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return user data
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
