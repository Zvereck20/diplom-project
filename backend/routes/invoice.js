const express = require("express");
const authenticated = require("../middlewares/authenticated");
const {
  addInvoice,
  editInvoice,
  deleteInvoice,
  getInvoices,
} = require("../controllers/invoice");

const mapInvoice = require("../helpers/mapInvoice");

const router = express.Router({ mergeParams: true });
// все запросы с /invoice

router.get("/", authenticated, async (req, res) => {
  const invoices = await getInvoices(req.user.id);

  res.send({ data: invoices.map((invoice) => mapInvoice(invoice)) });
});

router.post("/", authenticated, async (req, res) => {
  const newInvoice = await addInvoice({
    ...req.body,
    image: req.body.imageUrl,
    user: req.user.id,
  });

  res.send({ data: mapInvoice(newInvoice) });
});

router.patch("/:id", authenticated, async (req, res) => {
  const updatedInvoice = await editInvoice(req.params.id, {
    ...req.body,
    image: req.body.imageUrl,
  });

  res.send({ data: mapInvoice(updatedInvoice) });
});

router.delete("/:id", authenticated, async (req, res) => {
  await deleteInvoice(req.params.id);

  res.send({ error: null });
});

module.exports = router;
