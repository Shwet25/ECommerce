const express = require('express');
const Carousel = require('../controllers/carouselproduct');
const  Forget  = require('../controllers/forgetpassword');
const Login = require('../controllers/loginuser');
const Newarrival = require('../controllers/newarrivalproduct');
const Controller = require('../controllers/registeruser');
const Topselling = require('../controllers/topsellingproduct');
const { verifyToken } = require('../Helpers/jwt');

const router = express.Router();


router.post("/register",Controller.register);
router.post("/login",Login.login);
router.put("/forget",verifyToken,Forget.forget);
router.get("/topselling", verifyToken,Topselling.selling);
router.get("/newarrival",verifyToken,Newarrival.arrival);
router.get("/carousel",verifyToken,Carousel.carousel)


module.exports = router;