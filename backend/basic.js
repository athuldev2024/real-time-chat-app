const express = require("express");

const app = express();

app.get("/super", function (req, res, next) {
  console.log(".......Before parent");
  req.sample = "hello world";
  console.log(req.sample);
  res.redirect("/bat");
  console.log(".........After parent");
});

app.all("/bat", function (req, res) {
  console.log("Before child");
  console.log(req.sample);
  // res.redirect("back");
  console.log("After child");
  res.send("Found");
});

app.listen(3000, function (req, res) {
  console.log("Server is running at port 3000");
});
