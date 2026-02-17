const express = require("express");
const { registerUser } = require("../controllers/userControl");


const router = express.Router();


router.post("/sign-up", registerUser);

module.exports = router;