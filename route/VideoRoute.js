const express = require("express");
const router = express.Router();
const VideoControl = require("../controller/VideoController");
const protect = require("../middleware/passport");

router.post("/register", protect, VideoControl.createVideo);
router.put("/edit/:id", protect, VideoControl.editVideo);
router.get("/", VideoControl.getAllVideo);

module.exports = router;
