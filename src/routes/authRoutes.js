const express = require("express");
const router = express.Router();
const authControlller = require("../controllers/authController");

router.post("/register", authControlller.register);
router.post("/login", authControlller.login);

module.exports = router;

