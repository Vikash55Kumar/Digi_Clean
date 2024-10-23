const express = require("express");
const router = express.Router();
const passport = require("../controllers/google")
router.get('/',
    passport.authenticate('google', { scope:
        [ 'email', 'profile' ] }
  ));
  
router.get( '/callback',
    passport.authenticate( 'google',  { failureRedirect: "/login" }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect("/listings");
    }
);

module.exports = router;