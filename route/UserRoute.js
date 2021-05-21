const express = require("express");
const router = express.Router();
const userControl = require("../controller/UserController");
const protect = require('../middleware/passport')

router.post("/register", userControl.register);
router.post("/login", userControl.login);
router.get("/me", protect, userControl.me);

module.exports = router;
