const User=require("../models/user");
module.exports.renderSignupForm=(req, res) => {
    res.render("../views/users/signup.ejs")
};

module.exports.Signup=async(req, res) => {
    try {
        //extract form such as email, password, username
        let {username, email, password} = req.body;
        const newUser=new User({email, username});
        
        const existingUser = await User.findOne({ email: email, username:username });
        if (existingUser) {
            req.flash("error", "User already exists");
            return res.redirect("/signup");
        }

        const registeredUser= await User.register(newUser, password);
        
        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", "welcome to wanderlust");
            res.redirect("/listings");
        })

    } catch(e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm=(req, res) => {
    res.render("users/login.ejs");
};

module.exports.login=async(req, res) => {
    req.flash("success", "welcome to wanderlust! You are logged in!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.Logout=(req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "you are logged out");
        res.redirect("/listings");
    });
};
