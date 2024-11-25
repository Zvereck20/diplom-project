const express = require("express");
const authenticated = require("../middlewares/authenticated");
const {
  addOperation,
  editOperation,
  deleteOperation,
  getOperations,
  getOperation,
} = require("../controllers/operation");

const mapOperation = require('../helpers/mapOperation');

const router = express.Router({ mergeParams: true });
// все запросы с /operation

router.get("/", authenticated, async (req, res) => {
  const { operations, lastPage } = await getOperations(
    req.query.limit,
    req.query.page,
    req.query.sortCategory
  );

  res.send({ data: { operations: operations.map((operation) => mapOperation(operation)), lastPage } });
});

router.get("/:id", authenticated, async (req, res) => {
  const operation = await getOperation(req.params.id);

  res.send({ data: mapOperation(operation) });
});

router.post("/", authenticated, async (req, res) => {
  const newOperation = await addOperation({
    ...req.body,
    user: req.user.id,
  });

  res.send({ data: newOperation });
});

router.patch("/:id", authenticated, async (req, res) => {
  const updatedOperation = await editOperation(req.params.id, {
    ...req.body,
  });

  res.send({ data: updatedOperation });
});

router.delete("/:id", authenticated, async (req, res) => {
  await deleteOperation(req.params.id);

  res.send({ error: null });
});

module.exports = router;
