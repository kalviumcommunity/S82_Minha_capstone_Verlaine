const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");

//post endpoint is used for signup
router.post("/signup", signup);
// post router is used for login
router.post("/login", login);

module.exports = router;