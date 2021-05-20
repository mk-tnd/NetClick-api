const express = require("express");
const router = express.Router();
const userControl = require("../controller/UserController");

router.post("/register", userControl.register);
router.post("/login", userControl.login);
router.get("/me", userControl.me);

module.exports = router;
