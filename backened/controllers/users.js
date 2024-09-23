const userModel = require("../models/user");

module.exports.signup = async (req, res) => {
  try {
    let { username, email, password, role } = req.body;
    const newUser = new userModel({ username, email, role });
    const registeredUser = await userModel.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      res.send("User registered successfully");
    });
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.signin = async (req, res) => {
  res.send("User signed in successfully");
};

module.exports.signout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.send("User signed out successfully");
  });
};
