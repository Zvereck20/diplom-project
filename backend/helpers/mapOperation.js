module.exports = function (operation) {
  return {
    id: operation.id,
    createdAt: operation.createdAt,
    comment: operation.comment,
    amount: operation.amount,
    category: {
      id: operation.category.id,
      title: operation.category.title,
      imageUrl: operation.category.image,
      type: operation.category.type,
    },
    invoice: {
      id: operation.invoice.id,
      title: operation.invoice.title,
      imageUrl: operation.invoice.image,
    },
  };
};
