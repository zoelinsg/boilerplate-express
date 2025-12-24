require("dotenv").config();
const bodyParser = require("body-parser");

console.log("Hello World");
const express = require("express");
const app = express();

// ✅ 解析 HTML form: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// ✅ 解析 JSON body（有些測試會用 JSON 送）
app.use(bodyParser.json());

app.use(function (req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", function (req, res) {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }
  res.json({ message });
});

app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  }
);

// ✅ Challenge 10 (GET /name?first=...&last=...)
app.get("/name", function (req, res) {
  const first = req.query.first;
  const last = req.query.last;
  res.json({ name: first + " " + last });
});

// ✅ Challenge 11 (POST /name, body: first=...&last=...)
app.post("/name", function (req, res) {
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});

app.get("/:word/echo", function (req, res) {
  res.json({ echo: req.params.word });
});

module.exports = app;
//還沒過