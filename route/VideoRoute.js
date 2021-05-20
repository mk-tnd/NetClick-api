const express = require("express");
const VideoController = require("../controller/VideoController");

const router = express.Router();

router.post("/", VideoController.createVideo);

module.exports = router;
