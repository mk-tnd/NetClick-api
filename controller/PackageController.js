const { sequelize, Package } = require('../models')
const ValidateError = require('../middleware/ValidateError')
async function createPackage(req, res, next) {
  const { name, videoQuality, resolutions, price, packageTime } = req.body
  const transaction = await sequelize.transaction()
  try {
    if (!name) throw new ValidateError('Package name is required', 400)
    if (name.trim() === "") throw new ValidateError('Package name can not be blank', 400)
    const sendData = {
      name,
      videoQuality,
      resolutions,
      price,
      packageTime
    }
    const data = await Package.create(sendData, { transaction })
    await transaction.commit()
    res.status(200).json({ message: 'Package created', data })
  } catch (err) {
    next(err)
    await transaction.rollback()
  }

}

async function editPackage(req, res, next) {
  const { packageId } = req.params
  const { name, videoQuality, resolutions, price, packageTime } = req.body
}
function getPackage() { }


module.exports = {
  createPackage,
  editPackage,
  getPackage
}