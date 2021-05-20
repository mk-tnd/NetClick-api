const { sequelize, Package, UserPackage } = require('../models')
const ValidateError = require('../middleware/ValidateError')
async function createPackage(req, res, next) {
  const { role } = req.user
  const { name, videoQuality, resolutions, price, packageTime } = req.body
  const transaction = await sequelize.transaction()
  try {
    if (role !== 'admin') throw new ValidateError('Unauthorized', 401)
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
  const { id } = req.params
  const { role } = req.user
  const { name, videoQuality, resolutions, price, packageTime } = req.body

  const beforeUpdate = await Package.findOne({ where: { id } })

  try {
    if (!beforeUpdate) throw new ValidateError('Can not find this package', 400)
    if (role !== 'admin') throw new ValidateError('Unauthorized', 401)

    const sendData = {
      name: name || beforeUpdate.name,
      videoQuality: videoQuality || beforeUpdate.videoQuality,
      resolutions: resolutions || beforeUpdate.resolutions,
      price: price || beforeUpdate.price,
      packageTime: packageTime || beforeUpdate.packageTime
    }

    await Package.update(sendData, { where: { id } })

    res.status(200).json({ message: 'Updated' })
  } catch (err) {
    next(err)
  }


}
async function getPackage(req, res, next) {
  const { role, id } = req.user
  const { sort, item, desc } = req.query

  const searchCondition = { include: [{ model: Package, attributes: ['name', 'videoQuality', 'resolutions', 'packageTime'] }] }

  let condition = {}

  sort ? condition = { ...searchCondition, order: [[`${item}`, desc ? `DESC` : `ASC`]] } : condition = { ...searchCondition }

  try {
    role === 'admin' ? data = await UserPackage.findAll(condition) : data = await UserPackage.findOne({ where: { userId: id }, ...searchCondition })

    res.status(200).json({ data })
  } catch (err) {
    next(err)
  }


}

async function bestsellerPackage(req, res, next) {
  const { role } = req.user
  try {
    if (role !== 'admin') throw new ValidateError('Unauthorized', 401)
    const data = await UserPackage.findAll({
      attributes: ['packageId', [sequelize.fn('COUNT', sequelize.col('package_id')), 'total_sell_package']],
      order: sequelize.literal('total_sell_package DESC'),
      group: ['packageId'],
      include: [{ model: Package, attributes: ['name', 'videoQuality', 'resolutions', 'packageTime'] }]
    })

    res.status(200).json({ data })
  } catch (err) {
    next(err)
  }
}
module.exports = {
  createPackage,
  editPackage,
  getPackage,
  bestsellerPackage
}