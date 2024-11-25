module.exports = function (user) {
  return {
    email: user.email,
    imageUrl: user.image,
  };
};
