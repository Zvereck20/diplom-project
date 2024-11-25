module.exports = function (category) {
  return {
    id: category.id,
    title: category.title,
    type: category.type,
    imageUrl: category.image,
  };
};