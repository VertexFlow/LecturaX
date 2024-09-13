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

const userRouter = require("./routes/userRouter.js");

app.use(express.urlencoded({ extended: true }));
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

// Routers
app.use("/api/", userRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.get("/api/dashboard", (req, res) => {
  res.send({ username: "John Doe" });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
