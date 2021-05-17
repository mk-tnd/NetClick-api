const { sequelize, Profile } = require('../models')
const ValidateError = require('../middleware/ValidateError')
const cloudinary = require('cloudinary').v2
const fs = require('fs')

async function createProfile(req, res, next) {
  const { id } = req.user
  req.file ? { path } = req.file : path = ""
  const { profileName, profileType } = req.body
  const transaction = await sequelize.transaction()

  if (path) {
    try {
      if (profileName.trim() === "") throw new ValidateError('Profile name can not be blank', 400)
      if (!profileName) throw new ValidateError('Profile name is required', 400)
      if (!profileType) throw new ValidateError('Profile type is required', 400)

      cloudinary.uploader.upload(path, async (err, result) => {
        if (err) return next(err)

        const dataCreateProfile = {
          profileName,
          profileType,
          profilePicture: result.secure_url,
          userId: id,
          profileStatus: 'Actived'
        }

        const profile = await Profile.create(dataCreateProfile, { transaction })

        console.log(profile)

        fs.unlinkSync(path)
        await transaction.commit()
        res.status(200).json({ message: `Profile Created` })
      })

    } catch (err) {
      await transaction.rollback()
      next(err)
    }
  } else {
    try {
      const dataCreateProfile = {
        profileName,
        profileType,
        userId: id,
        profileStatus: 'Actived'
      }

      const profile = await Profile.create(dataCreateProfile, { transaction })

      console.log(profile)
      await transaction.commit()
      res.status(200).json({ message: `Profile created` })

    } catch (err) {
      await transaction.rollback()
      next(err)
    }


  }
}

async function editProfile(req, res, next) {
  const { id } = req.user
  const { profileId } = req.params
  req.file ? { path } = req.file : path = ""
  const { profileName, profileType, profileStatus } = req.body
  const beforeUpdate = await Profile.findOne({ where: { id: profileId } })

  if (path) {
    try {

      console.log(beforeUpdate)
      if (!beforeUpdate) throw new ValidateError('Can not found this profile', 400)

      cloudinary.uploader.upload(path, async (err, result) => {
        if (err) return next(err)

        const dataUpdateProfile = {
          profileName: profileName || beforeUpdate.profileName,
          profileType: profileType || beforeUpdate.profileType,
          profilePicture: result.secure_url || beforeUpdate.profilePicture,
          profileStatus: profileStatus || beforeUpdate.profileStatus,
          profileStatus: profileStatus || beforeUpdate.profileStatus,
          userId: id,
        }

        await Profile.update(dataUpdateProfile, { where: { id: profileId } })



        fs.unlinkSync(path)

        res.status(200).json({ message: `Profile Updated` })
      })

    } catch (err) {

      next(err)
    }
  } else {
    try {

      if (!beforeUpdate) throw new ValidateError('Can not found this profile', 400)



      const dataUpdateProfile = {
        profileName: profileName || beforeUpdate.profileName,
        profileType: profileType || beforeUpdate.profileType,
        profileStatus: profileStatus || beforeUpdate.profileStatus,
        userId: id
      }

      await Profile.update(dataUpdateProfile, { where: { id: profileId } })



      res.status(200).json({ message: `Profile Updated` })

    } catch (err) {

      next(err)
    }


  }
}

async function getAllProfile(req, res, next) {

  try {
    const { role, id } = req.user
    role === 'admin' ? search = { where: { userId: id } } : search = { where: { userId: id, profileStatus: "Actived" } }

    const data = await Profile.findAll(search)

    res.status(200).json({ data })

  } catch (err) {
    next(err)
  }

}

module.exports = {
  createProfile,
  editProfile,
  getAllProfile
}

