const express = require('express')
const router = express.Router();

const routes = require('./router')
const update = require("../controller/Forgot");
const topselling = require('../controller/topselling');
const  newarrival = require('../controller/newarrival');



module.exports=router;