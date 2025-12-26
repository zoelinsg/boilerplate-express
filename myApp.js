require("dotenv").config();

console.log("Hello World");
const express = require("express");
const cors = require("cors");
const app = express();

// ✅ 1) 允許跨域（freeCodeCamp 測試需要）
app.use(cors());

// ✅ 2) 跳過 ngrok 的 browser warning（free plan 會擋自動測試）
app.use((req, res, next) => {
  res.setHeader("ngrok-skip-browser-warning", "1");
  next();
});

// ✅ 解析 body（表單 + JSON）
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

// ✅ Challenge 10
app.get("/name", function (req, res) {
  const first = req.query.first;
  const last = req.query.last;
  res.json({ name: first + " " + last });
});

// ✅ Challenge 11
app.post("/name", function (req, res) {
  const first = req.body.first;
  const last = req.body.last;
  res.json({ name: `${first} ${last}` });
});

app.get("/:word/echo", function (req, res) {
  res.json({ echo: req.params.word });
});

module.exports = app;
