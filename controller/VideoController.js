const { sequelize, Video } = require("../models");
const ValidateError = require('../middleware/ValidateError')


exports.createVideo = async (req, res, next) => {
  try {
    const { role } = req.user
    const { name, vname, description, categoryId } = req.body;
    if (role !== 'admin') throw new ValidateError('Unauthorized', 401)
    if (!name) throw new ValidateError('Video name is required', 400)
    if (name.trim() === "") throw new ValidateError('Video name can not be blank', 400)
    if (!vname) throw new ValidateError('Video file or link is required', 400)
    if (vname.trim() === "") throw new ValidateError('Video file or link is required', 400)
    if (!categoryId) throw new ValidateError('Category is required', 400)

    const video = await Video.create({
      name,
      vname,
      description,
      status: "Showing",
      categoryId,
    });

    res.status(200).json({ video });
  } catch (err) {
    next(err);
  }
};

exports.editVideo = async (req, res, next) => {
  try {

  } catch (err) {
    next(err)
  }
}