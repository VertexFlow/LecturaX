const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// const userController = require("../controllers/users.js");

router.post("/signup", async function (req, res) {
	try {
		let { username, email, password } = req.body;

		let user = await userModel.findOne({ email: email });
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
					});

					let token = jwt.sign({ username, id: user._id }, "heyheyhey");
					res.cookie("token", token);
					res.send("User Created Successfully");
				}
			});
		});
	} catch (err) {
		console.log(err.message);
	}
});

router.post("/signin", async function (req, res) {
	try {
		let { username, password } = req.body;

		let user = await userModel.findOne({ username: username });
		if (!user) return res.send("username or password incorrect");

		bcrypt.compare(password, user.password, function (err, result) {
			if (result) {
				let token = jwt.sign({ username, id: user._id }, "heyheyhey");
				res.cookie("token", token);
				res.send("User loggedin Successfully");
			} else {
				res.send("username or password incorrect");
			}
		});
	} catch (err) {}
});

module.exports = router;
