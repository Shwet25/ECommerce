const express = require('express');
const  Forget  = require('../controllers/Forget');
const Newarrival = require('../controllers/newarrivalproduct');
const Controller = require('../controllers/Register');
const Topselling = require('../controllers/topsellingproduct');

 

const router = express.Router();


router.post("/register",Controller.register);
router.put("/forget",Forget.forget);
router.get("/topselling",Topselling.selling);
router.get("/newarrival",Newarrival.arrival);


module.exports = router;