const express = require("express");
const route = express.Router();
const user = require("../controllers/UserController");
const checkAuthen = require("../passport.setup");

//API mothod
route.get("/login", checkAuthen, user.login);
route.post("/register", user.register);

module.exports = route;
