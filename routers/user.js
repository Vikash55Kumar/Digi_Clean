const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const WrapAsync = require("../Utils/WrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middelware.js");

const userController=require("../controllers/users.js");

// use route.router to get all route request in single route
router
    .route("/signup")
    .get(userController.renderSignupForm)
    .post(WrapAsync(userController.Signup));

router
    .route("/login")
    .get( userController.renderLoginForm)
    .post(passport.authenticate("local", { 
        failureRedirect : '/login', 
        failureFlash : true,
    }), 
    userController.login
    );

router.get("/logout", userController.Logout);

module.exports=router;