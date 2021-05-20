const express = require('express')
const router = express.Router()
const PackageControl = require('../controller/PackageController')
const protect = require('../middleware/passport')

router.post('/register', PackageControl.createPackage)
router.put('/edit/:id', protect, PackageControl.editPackage)
router.get('/', protect, PackageControl.getPackage)
router.get('/bestsellerPackage', protect, PackageControl.bestsellerPackage)

module.exports = router