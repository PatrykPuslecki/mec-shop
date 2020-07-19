const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("Error", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome!" });
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`PORT: ${PORT}`);
});
