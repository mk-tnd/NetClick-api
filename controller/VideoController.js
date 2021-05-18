const { videos } = require("../models");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

exports.createVideo = async (req, res, next) => {
  try {
    const { name, vname, description, status, categoryId } = req.body;
    if (req.file) {
      cloudinary.uploader.upload(req.file.path, async (err, result) => {
        if (err) return next(err);
        const video = await videos.create({
          name,
          vname: result.secure_url || null,
          description,
          status,
          categoryId,
        });
        fs.unlinkSync(req.file.path);
        res.status(200).json({ video });
      });
    } else {
      const video = await videos.create({
        name,
        vname: null,
        description,
        status,
        categoryId,
      });
      res.status(200).json({ video });
    }
  } catch (err) {
    next(err);
  }
};
