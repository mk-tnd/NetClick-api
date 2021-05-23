const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./passport.setup");
const useRoute = require("./routes/user");

app.use(cors());

// parse application/ x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//parse application/json
app.use(bodyParser.json());

app.use(
  cookieSession({
    name: "netclick",
    keys: ["key1", "key2"],
  })
);

app.use("/user", useRoute);

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => res.send("You are not logged in!"));
app.get("/failed", (req, res) => res.send("You are failed to log in"));
app.get("/good", isLoggedIn, (req, res) => {
  // console.log(req.user);
  res.send(`Welcome mr ${req.user.displayName}!`);
});

app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res, next) {
    // Successful authentication, redirect home.
    res.redirect("/good");
  }
);

app.get("./logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

const port = 8000;
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
