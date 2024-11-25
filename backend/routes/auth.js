const express = require("express");
const authenticated = require("../middlewares/authenticated");
const { register, login, updateUser } = require("../controllers/user");
const mapUser = require("../helpers/mapUser");

const router = express.Router({ mergeParams: true });

router.post("/register", async (req, res) => {
  try {
    const { user, token } = await register(req.body.email, req.body.password);

    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { user, token } = await login(req.body.email, req.body.password);

    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

router.patch("/edit-user", authenticated, async (req, res) => {
  const udatedUser = await updateUser(req.user.id, {
    ...req.body,
    image: req.body.imageUrl,
  });
  
  res.send({ data: mapUser(udatedUser) });
});

router.post("/logout", async (req, res) => {
  res.cookie("token", "", { httpOnly: true }).send({});
});

module.exports = router;
