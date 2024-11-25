const express = require("express");

const router = express.Router({ mergeParams: true });

router.use("/", require("./auth"));
router.use("/invoice", require("./invoice"));
router.use("/category", require("./category"));
router.use("/operation", require("./operation"));

module.exports = router;
