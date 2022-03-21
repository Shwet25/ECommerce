const express = require('express');
const Controller = require('../controller/Login');
const router = express.Router();


router.post("/Login",Controller.Login);


module.exports = router;