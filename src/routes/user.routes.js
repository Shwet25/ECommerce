"use strict";

// IMPORTS ==================================================================================================
const { Router } = require("express");
const { userController } = require("../controllers");

const router = new Router();

// API ROUTES ===============================================================================================
router.get("/get-all", userController.getAllUsers);
router.post("/register", userController.addUser);

// EXPORTS ==================================================================================================
module.exports = router;
