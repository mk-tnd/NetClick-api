const { videos } = require("../models");

exports.createVideo = async (req, res, next) => {
  try {
    const { name, vname, description, status, categoryId } = req.body;
    const video = await videos.create({
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
