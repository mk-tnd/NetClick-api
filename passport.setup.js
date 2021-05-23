const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const express = require("express");
const router = express.Router();
// const user = require("user");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "604354582550-ko5rehaisb2sqgi4kcj201bdmbk4h4oc.apps.googleusercontent.com",
      clientSecret: "Dl42wtbplue1-erNZxllJdew",
      callbackURL: "http://localhost:8000/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      //use the proflie info
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return done(null, profile);
      // });
      return done(null, profile);
    }
  )
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res, next) {
    // Successful authentication, redirect home.
    res.redirect("/good");
  }
);

function checkAuthen(req, res, next) {
  if (req.user) {
    console.log(req.user);
    next();
  } else {
    res.status(401);
  }
}
module.exports = checkAuthen;
