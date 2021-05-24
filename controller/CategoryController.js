const { sequelize, Category } = require("../models");
const ValidateError = require("../middleware/ValidateError");

async function createCategory(req, res, next) {
  const { role } = req.user;
  const { name } = req.body;
  const transaction = await sequelize.transaction();
  try {
    if (!name) throw new ValidateError("Category name is required", 400);
    if (name.trim() === "")
      throw new ValidateError("Category name can not be blank", 400);
    if (role !== "admin") throw new ValidateError("Unauthorized", 401);

    await Category.create({ name });
    res.status(200).json({ message: "Category Created" });

    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
}
async function editCategory(req, res, next) {
  const { role } = req.user;
  const { name } = req.body;
  const { id } = req.params;
  const beforeUpdate = await Category.findOne({ where: { id } });

  try {
    if (role !== "admin") throw new ValidateError("Unauthorized", 401);
    if (!beforeUpdate)
      throw new ValidateError("Can not find this category", 400);
    await Category.update({ name }, { where: { id } });
    res.status(200).json({ message: "Updated" });
  } catch (err) {
    next(err);
  }
}

async function getCategory(req, res, next) {
  const { single } = req.query;

  single
    ? (data = await Category.findOne({ where: { id: `${single}` } }))
    : (data = await Category.findAll());

  res.status(200).json({ data });
}

module.exports = {
  createCategory,
  editCategory,
  getCategory,
};
