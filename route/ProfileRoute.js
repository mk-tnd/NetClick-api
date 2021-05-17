const express = require('express')
const router = express.Router()
const ProfileControl = require('../controller/ProfileController')
const protect = require('../middleware/passport')
const upload = require('../middleware/upload')

router.post('/newProfile', protect, upload.single('image'), ProfileControl.createProfile)
router.put('/editProfile/:profileId', protect, upload.single('image'), ProfileControl.editProfile)
module.exports = router