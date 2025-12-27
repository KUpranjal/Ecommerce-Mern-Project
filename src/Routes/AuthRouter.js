const express = require("express");
const router = express.Router();

const {
 userSignin,
 userSignout,
 userSignup
} = require("../Controller/AuthController");



router.post("/signup", userSignup )
router.post("/signin" , userSignin )
router.post("/signout", userSignout )

module.exports = {
  AuthRouter: router
};
