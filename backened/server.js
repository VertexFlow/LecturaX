if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./models/userModel.js");
const MongoStore = require("connect-mongo");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");

const userRouter = require("./routes/userRouter.js");
const dashboardRouter = require("./routes/dashboardRouter.js");

// app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

const dbUrl = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionOptions));

// Routers
app.use("/api/", userRouter);
app.use("/api/dashboard/:id", dashboardRouter);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Oh NO! Something Went Wrong!!!" } = err;
  res.status(statusCode).send({ message });
  // res.status(statusCode).send(message);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
