const express = require('express');
const Login = require('../controller/Login');
const Forgot= require('../controller/Forgot')
const router = express.Router();


router.post("/login",Login.login);
router.put("/forgot",Forgot.forgot);


module.exports = router;