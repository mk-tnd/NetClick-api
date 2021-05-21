const express = require("express");
const router = express.Router();
const VideoControl = require("../controller/VideoController");
const protect = require("../middleware/passport");

router.post("/add", protect, VideoControl.createVideo);
router.put("/edit/:id", protect, VideoControl.editVideo);
router.get("/", protect, VideoControl.getAllVideo);
router.get('/single/:id', protect, VideoControl.getSingleVideo)
module.exports = router;
