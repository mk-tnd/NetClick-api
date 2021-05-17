const { sequelize, User, UserPackage } = require('../models')
const ValidateError = require('../middleware/ValidateError')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { SECRET_KEY, EXPIRE, SALT_ROUND } = process.env


async function register(req, res, next) {

  const { email, password, confirmPassword, packageId } = req.body
  const isEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
  const isPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
  const transaction = await sequelize.transaction()
  try {
    if (!isEmail.test(email)) throw new ValidateError('Invalid Email', 400)
    const duplicateEmail = await User.findOne({ where: { email } })

    if (duplicateEmail) throw new ValidateError('This email is used', 400)
    if (email.trim() === "") throw new ValidateError('Email can not be blank', 400)
    if (!email) throw new ValidateError('Email is required', 400)
    if (!isPassword.test(password)) throw new ValidateError('Password must contain minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character')
    if (password !== confirmPassword) throw new ValidateError('Password and confirm password must be matched ', 400)
    if (password.trim() === "") throw new ValidateError('Password can not be blank', 400)
    if (!password) throw new ValidateError('Password is required', 400)
    if (!confirmPassword) throw new ValidateError('Comfirm password is required', 400)

    const hashPassword = await bcrypt.hash(password, parseInt(SALT_ROUND))

    const createUserData = {
      email,
      password: hashPassword,
      role: 'user',
      status: 'active '
    }
    const data = await User.create(createUserData, { transaction })

    const createUserPackageData = {
      userId: data.id,
      packageId,
    }

    await UserPackage.create(createUserPackageData, { transaction })

    const payload = {
      id: data.id,
      email: data.email,
      role: data.role,
      status: data.active
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: parseInt(EXPIRE) })
    await transaction.commit()
    res.status(200).json({ message: 'Sign Up successfully', token })
    console.log(data)
  } catch (err) {
    await transaction.rollback()
    next(err)
  }

}



async function login(req, res, next) {

  const { email, password } = req.body

  const data = await User.findOne({ where: { email } })

  const isMatch = await bcrypt.compare(password, data.password)
  try {
    if (!data) throw new ValidateError('Can not found this user', 400)
    if (!isMatch) throw new ValidateError('Username or password is wrong', 400)
    const payload = {
      id: data.id,
      email: data.email,
      role: data.role,
      status: data.status
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: parseInt(EXPIRE) })

    res.status(200).json({ message: 'Login successfully', token })

  } catch (err) {
    next(err)
  }


}



module.exports = {
  login,
  register
}
