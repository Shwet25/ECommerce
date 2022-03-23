const express = require('express');
const Controller = require('../controller/Login');
const Forgot= require('../controller/Forgot')
const router = express.Router();


router.post("/Login",Controller.Login);
router.put("/Forgot",Forgot.Forgot);


module.exports = router;