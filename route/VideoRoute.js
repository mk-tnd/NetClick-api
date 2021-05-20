const express = require('express')
const router = express.Router()
const ViderControl = require('../controller/VideoController')
const protect = require('../middleware/passport')
router.post('/register', protect, ViderControl.createVideo)


module.exports = router