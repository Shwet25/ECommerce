"use strict";

// IMPORTS ==================================================================================================
const { Router } = require("express");
const { userController } = require("../controllers");
const authentication = require("../middleware/authentication.middleware");
const multer = require("multer");
const upload = multer({dest : 'uploads/'});
const router = new Router();

// API ROUTES ===============================================================================================
router.post("/register", userController.addUser);
router.post("/login", userController.userLogin);
router.put("/update-password", userController.userUpdatePassword);

// All APIs written below needs to be authenticated with token.
router.get("/get-all", authentication, userController.getAllUsers);
router.get("/logout", authentication, userController.userLogout);
router.delete("/delete/:id", authentication, userController.deleteUser);
router.put("/update", authentication, userController.updateUser);


const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: 'images', 
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now() 
             + path.extname(file.originalname))
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
      fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg)$/)) { 
         // upload only png and jpg format
         return cb(new Error('Please upload a Image'))
       }
     cb(undefined, true)
  }
}) 


// For Single image upload
router.post('/uploadImage', imageUpload.single('image'),userController.imageUpload);

// EXPORTS ==================================================================================================
module.exports = router;
