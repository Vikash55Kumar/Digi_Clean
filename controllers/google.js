const passport =require("passport")
const User = require("../models/user")
var GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;
// const callback= `http://localhost:${process.env.PORT}`;
passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.GOOGLE_CALLBACK_URL}`,
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    const existingUser = await User.findOne({ providerId: profile.id });
    if (existingUser) {
        return done(null, existingUser);
    } else {
        const newUser = new User({
            providerId: profile.id,
            provider: 'google',
            fName: profile._json.given_name,
            lName: profile._json.family_name,
            email: profile._json.email || `google${(Math.floor(Math.random() * (501)) + 500)}@example.com`,
            username: profile._json.given_name.toLowerCase()+(Math.floor(Math.random() * (1000 - 500 + 1)) + 500),
            image: {
                url: profile._json.picture.replace("=s96-c", "=s400-c"),
                filename: `google${profile.id}`,
            },
        });
        let googleUser = await newUser.save();
        console.log(googleUser);
        return done(err, googleUser);
    }  
}
));

module.exports = passport;