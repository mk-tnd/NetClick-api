const { Video, Category } = require("../models");

exports.createVideo = async (req, res, next) => {
  try {
    const { thumbnailS, name, vname, description, categoryId } = req.body;
    const video = await Video.create({
      thumbnail: thumbnailS,
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
