const express = require('express')
const router = express.Router()
const CategoryControl = require('../controller/CategoryController')
const protect = require('../middleware/passport')

router.post('/register', protect, CategoryControl.createCategory)
router.put('/edit/:id', protect, CategoryControl.editCategory)
router.get('/', protect, CategoryControl.getCategory)
module.exports = router