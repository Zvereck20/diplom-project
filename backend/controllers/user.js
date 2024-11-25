const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generate } = require("../helpers/token");

// register

const register = async (email, password) => {
  if (!password) {
    throw new Error("Password is empty");
  }

  const passwordHash = await bcrypt.hash(password, 9);

  const user = await User.create({ email, password: passwordHash });
  const token = generate({ id: user.id });

  return { user, token };
};

// login

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Wrong password");
  }

  const token = generate({ id: user.id });

  return { user, token };
};

// edit

const updateUser = async (id, userData) => {
  if (userData.hasOwnProperty("password")) {
    const passwordHash = await bcrypt.hash(userData.password, 9);
    userData.password = passwordHash;
  }

  return User.findByIdAndUpdate(id, userData, { returnDocument: "after" });
};

module.exports = {
  register,
  login,
  updateUser,
};
