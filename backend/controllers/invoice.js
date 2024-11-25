const Invoice = require("../models/Invoice");

// add

const addInvoice = (invoice) => {
  return Invoice.create(invoice);
};

// edit

const editInvoice = (id, invoice) => {
  return Invoice.findByIdAndUpdate(id, invoice, { returnDocument: "after" });
};

// delete

const deleteInvoice = (id) => {
  return Invoice.deleteOne({ _id: id });
};

// getAll

const getInvoices = (userId) => {
  return Invoice.find({ user: userId });
};

module.exports = {
  addInvoice,
  editInvoice,
  deleteInvoice,
  getInvoices,
};
