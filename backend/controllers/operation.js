const Operation = require("../models/Operation");

// add

const addOperation = async (operation) => {
  const newOperation = await Operation.create(operation);

  return newOperation;
};

// edit

const editOperation = async (id, operation) => {
  const newOperation = Operation.findByIdAndUpdate(id, operation, {
    returnDocument: "after",
  });

  return newOperation;
};

// delete

const deleteOperation = (id) => {
  return Operation.deleteOne({ _id: id });
};

// get sort list

const getOperations = async (
  limit = 10,
  page = 1,
  sortCategory = "created"
) => {
  let sort = {};

  switch (sortCategory) {
    case "created":
      sort = { createdAt: -1 };
      break;
    case "invoice":
      sort = { invoice: -1 };
      break;
    case "amount":
      sort = { amount: -1 };
      break;
    case "comment":
      sort = { comment: -1 };
      break;
    case "category":
      sort = { category: -1 };
      break;
    default:
      sort = { createdAt: -1 };
      break;
  }

  const [operations, count] = await Promise.all([
    Operation.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .sort(sort)
      .populate("invoice category"),
    Operation.countDocuments(),
  ]);

  return {
    operations,
    lastPage: Math.ceil(count / limit),
  };
};

// get one

const getOperation = (id) => {
  return Operation.findById(id).populate("invoice category");
};

module.exports = {
  addOperation,
  editOperation,
  deleteOperation,
  getOperations,
  getOperation,
};
