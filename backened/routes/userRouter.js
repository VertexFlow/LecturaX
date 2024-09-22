const express = require("express");
const router = express.Router();
const userModel = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");

const userController = require("../controllers/users.js");

router.post("/signup", wrapAsync(userController.signup));

router.post(
  "/signin",
  passport.authenticate("local", {
    failureMessage: true,
  }),
  userController.signin
);

router.get("/signout", userController.signout);

module.exports = router;
