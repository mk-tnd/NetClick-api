const express = require('express')
const router = express.Router()
const CategoryControl = require('../controller/CategoryController')

router.post('/register', CategoryControl.createCategory)
router.put('/edit/:id', CategoryControl.editCategory)

module.exports = router