const express = require('express')
const router = express.Router()
const ProfileControl = require('../controller/ProfileController')

router.post('/newProfile', ProfileControl.createProfile)
router.put('/editProfile', ProfileControl.editProfile)
module.exports = router