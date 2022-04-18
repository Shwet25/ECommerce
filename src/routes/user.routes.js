"use strict";

// IMPORTS ==================================================================================================
const { Router } = require("express");
const { userController } = require("../controllers");
const auth = require("../middleware/authentication.middleware");

const router = new Router();

// API ROUTES ===============================================================================================
router.post("/register", userController.addUser);
router.post("/login", userController.userLogin);

router.use(auth);
// All APIs written below needs to be authenticated with token.
router.get("/get-all", userController.getAllUsers);

// EXPORTS ==================================================================================================
module.exports = router;
