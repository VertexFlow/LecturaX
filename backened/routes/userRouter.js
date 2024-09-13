const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// const userController = require("../controllers/users.js");

router.post("/signup", async function (req, res) {
  try {
    let { username, email, password, role } = req.body;

    let user = await userModel.findOne({ username: username });
    if (user)
      return res.status(401).send("You already have an account,please login");

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.send(err.message);
        else {
          let user = await userModel.create({
            username,
            email,
            password: hash,
            role,
          });

          let token = jwt.sign({ username, id: user._id }, "heyheyhey");
          res.cookie("token", token);
          res.send("User created");
        }
      });
    });
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/signin", async function (req, res) {
  try {
    let { username, password } = req.body;

    let user = await userModel.findOne({ username: username });
    if (!user) return res.status(401).send("User not registered");

    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let token = jwt.sign({ username, id: user._id }, "heyheyhey");
        res.cookie("token", token);
        res.send("User logged in");
      } else {
        res.send("Username or password incorrect");
      }
    });
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/signout", function (req, res) {
  res.clearCookie("token");
  res.send("User signed out");
});

module.exports = router;
