const Category = require("../models/Category");

// add

const addCategory = (category) => {
  return Category.create(category);
};

// edit

const editCategory = (id, сategory) => {
  return Category.findByIdAndUpdate(id, сategory, { returnDocument: "after" });
};

// delete

const deleteCategory = (id) => {
  return Category.deleteOne({ _id: id });
};

// getAll

const getCategorys = (userId) => {
  return Category.find({ user: userId });
};

module.exports = {
  addCategory,
  editCategory,
  deleteCategory,
  getCategorys,
};
