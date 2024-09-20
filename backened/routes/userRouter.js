const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");

// const userController = require("../controllers/users.js");

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password, role } = req.body;
      const newUser = new userModel({ username, email, role });
      const registeredUser = await userModel.register(newUser, password);
      console.log(registeredUser);
      res.send("User registered successfully");
      // res.redirect("http://localhost:3000/");
    } catch (err) {
      res.send(err.message);
    }
  })
);

router.post(
  "/signin",
  passport.authenticate("local", {
    failureRedirect: "/api/signin",
    failureFlash: true,
  }),
  async (req, res) => {
    res.send("User signed in successfully");
  }
);

router.get("/signout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.send("User signed out successfully");
  });
});

module.exports = router;
