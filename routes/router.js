const express = require('express');
// const Login = require('../controller/Login');
// const Forgot= require('../controller/Forgot')
const Register=require('../controller/register')
const router = express.Router();


router.post("/register",Register.register);
// router.put("/forgot",Forgot.forgot);


module.exports = router;