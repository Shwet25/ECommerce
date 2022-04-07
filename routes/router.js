const express = require('express');
const register = require('../controller/registeruser')
const Login = require('../controller/loginuser');
const Forgot= require('../controller/forgotpassword');
const  topselling  = require('../controller/topsellingproduct');
const  newarrival = require('../controller/newarrivalproduct');
const Carousel = require("../controller/carouselproduct");
const { verifyToken } = require('../helpers/jwt');

const router = express.Router();

router.post("/register",register.register);
router.post("/login",Login.login);
router.put("/forgot", verifyToken,Forgot.forgot);
router.get("/topselling", verifyToken,topselling.topselling);
router.get("/newarrival", verifyToken,newarrival.newarrival);
router.get("/carousel", verifyToken,Carousel.carousel);

module.exports = router;