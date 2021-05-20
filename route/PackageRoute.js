const express = require('express')
const router = express.Router()
const PackageControl = require('../controller/PackageController')

router.post('/register', PackageControl.createPackage)
router.put('/edit/:id', PackageControl.editPackage)

module.exports = router