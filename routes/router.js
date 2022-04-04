const express = require('express');
const Login = require('../controller/Login');
const Forgot= require('../controller/Forgot');
const  topselling  = require('../controller/topselling');
const  newarrival = require('../controller/newarrival');
const router = express.Router();


router.post("/login",Login.login);
router.put("/forgot",Forgot.forgot);
router.get("/topselling",topselling.topselling);
router.get("/newarrival",newarrival.newarrival);
module.exports = router;