const { sequelize, Video, Category } = require("../models");
const ValidateError = require("../middleware/ValidateError");
const { search } = require("../route/PackageRoute");

exports.createVideo = async (req, res, next) => {
  const { role } = req.user;
  const { thumbnail, name, vname, description, categoryId } = req.body;
  const transaction = await sequelize.transaction();

  try {
    if (role !== "admin") throw new ValidateError("Unauthorized", 401);
    if (!name) throw new ValidateError("Video name is required", 400);
    if (name.trim() === "")
      throw new ValidateError("Video name can not be blank", 400);
    if (!vname) throw new ValidateError("Video file or link is required", 400);
    if (vname.trim() === "")
      throw new ValidateError("Video file or link is required", 400);
    if (!categoryId) throw new ValidateError("Category is required", 400);

    const video = await Video.create({
      thumbnail,
      name,
      vname,
      description,
      status: "Showing",
      categoryId,
    });
    await transaction.commit();
    res.status(200).json({ video }, { transaction });
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

exports.editVideo = async (req, res, next) => {
  const { role } = req.user;
  const { id } = req.params;
  const { name, vname, description, categoryId, status } = req.body;
  const beforeUpdate = await Video.findOne({ where: { id } });

  try {
    if (role !== "admin") throw new ValidateError("Unauthorized", 401);
    if (!beforeUpdate) throw new ValidateError("Can not find this video", 400);

    const sendData = {
      name: name || beforeUpdate.name,
      vname: vname || beforeUpdate.vname,
      description: description || beforeUpdate.description,
      categoryId: categoryId || beforeUpdate.categoryId,
      status: status || beforeUpdate.status,
    };

    await Video.update(sendData, { where: { id } });

    res.status(200).json({ message: "Updated" });
  } catch (err) {
    next(err);
  }
};

exports.getAllVideo = async (req, res, next) => {
  const { role } = req.user;
  const { category } = req.query; //ใช้ id ของ category ในการระบุว่าเป็นหนังประเภทไหน
  let search;
  role === "admin"
    ? (search = { include: [{ model: Category, attributes: ["name"] }] })
    : (search = {
        where: { status: "Showing" },
        include: [{ model: Category, attributes: ["name"] }],
      });
  let condition = {};
  !category
    ? (condition = { ...search })
    : role === "admin"
    ? (condition = { ...search, where: { categoryId: category } })
    : (condition = {
        where: { status: "Showing", categoryId: category },
        include: [{ model: Category, attributes: ["name"] }],
      });
  try {
    const data = await Video.findAll(condition);
    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
};

exports.getSingleVideo = async (req, res, next) => {};
