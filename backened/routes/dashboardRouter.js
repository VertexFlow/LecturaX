const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ username: "Jane Doe" });
});

module.exports = router;
