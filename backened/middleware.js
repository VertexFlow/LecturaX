module.exports.isLoggedIn = function (req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).send("Please signin to continue");
  }
  next();
};

module.exports.isAdmin = function (req, res, next) {
  if (req.session.user.role !== "admin") {
    return res.status(403).send("You are not authorized");
  }
  next();
};

module.exports.isTeacher = function (req, res, next) {
  if (req.session.user.role !== "teacher") {
    return res.status(403).send("You are not authorized");
  }
  next();
};

module.exports.isStudent = function (req, res, next) {
  if (req.session.user.role !== "student") {
    return res.status(403).send("You are not authorized");
  }
  next();
};

module.exports.isOwner = function (req, res, next) {
  if (req.session.user.id !== req.params.id) {
    return res.status(403).send("You are not authorized");
  }
  next();
};

module.exports.isAuthorized = function (req, res, next) {
  if (
    req.session.user.role !== "admin" &&
    req.session.user.id !== req.params.id
  ) {
    return res.status(403).send("You are not authorized");
  }
  next();
};
