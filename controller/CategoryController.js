async function createCategory(req, res, next) {
  const { id, role } = req.user
  console.log(role)
}
function editCategory() { }
function getCategory() { }

module.exports = {
  createCategory,
  editCategory,
  getCategory
}