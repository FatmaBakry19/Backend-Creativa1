
const express = require("express");

const {
  register,
  login,
} = require("../config/controllers/authController");

const {
  validateRegister,
  validateLogin,
} = require("../config/validators/authValidator");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

module.exports = router;
