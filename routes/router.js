const express = require('express');
const  Forget  = require('../controllers/Forget');
const Controller = require('../controllers/Register'); 

const router = express.Router();


router.post("/register",Controller.register);
router.put("/forget",Forget.forget)


module.exports = router;