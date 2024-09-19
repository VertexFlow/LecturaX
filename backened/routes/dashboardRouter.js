const express = require("express");
const { isLoggedIn } = require("../middleware");
const router = express.Router();

router.get("/", isLoggedIn, (req, res) => {
  let loggedUser = req.user;
  res.send(loggedUser);
});

module.exports = router;
