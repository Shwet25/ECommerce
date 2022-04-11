const express = require('express');
const Admin = require('../controllers/adminlogin');
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
router.get("/topselling",Topselling.selling);
router.get("/newarrival",Newarrival.arrival);
router.get("/carousel",Carousel.carousel);
router.post("/adminlogin",Admin.admin);


module.exports = router;