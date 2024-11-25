const express = require("express");
const authenticated = require("../middlewares/authenticated");
const {
  addCategory,
  editCategory,
  deleteCategory,
  getCategorys,
} = require("../controllers/category");
const mapCategory = require('../helpers/mapCategory');

const router = express.Router({ mergeParams: true });
// все запросы с /category

router.get("/", authenticated, async (req, res) => {
  const categorys = await getCategorys(req.user.id);

  res.send({ data: categorys.map((category) => mapCategory(category)) });
});

router.post("/", authenticated, async (req, res) => {  
  const newCategory = await addCategory({
    ...req.body,
    image: req.body.imageUrl,
    user: req.user.id,
  });

  res.send({ data: mapCategory(newCategory) });
});

router.patch("/:id", authenticated, async (req, res) => {
  const updatedCategory = await editCategory(req.params.id, {
    ...req.body,
    image: req.body.imageUrl,
  });

  res.send({ data: mapCategory(updatedCategory) });
});

router.delete("/:id", authenticated, async (req, res) => {
  await deleteCategory(req.params.id);

  res.send({ error: null });
});

module.exports = router;
