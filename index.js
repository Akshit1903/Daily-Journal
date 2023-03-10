//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const _ = require("lodash");

const homeStartingContent =
  "Hey, Welcome to my Daily Joural App! Click on the Compose Button to get started!";
const aboutContent =
  "This is one of my fundamental projects developed during the learning awesome technologies such as Express and EJS!";
const contactContent = "Email me at akshit.lalit@gmail.com";

const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const posts = [];

app.get("/", function (req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
    homePosts: posts,
  });
});
app.get("/about", function (req, res) {
  res.render("about", { startingContent: aboutContent });
});
app.get("/contact", function (req, res) {
  res.render("contact", { startingContent: contactContent });
});
app.get("/compose", function (req, res) {
  res.render("compose");
});
app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach(function (post) {
    if (_.lowerCase(post.title) === requestedTitle) {
      res.render("post", { postHeading: post.title, postBody: post.content });
    }
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
