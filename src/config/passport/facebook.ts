import passport from 'passport';
import passportFacebook from 'passport-facebook';

passport.use(new passportFacebook.Strategy({
<<<<<<< HEAD
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3001/auth/facebook/callback"
=======
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3001/auth/facebook"
>>>>>>> 05d5fdc... Change the facebook login endpoint
}, function (accessToken, refreshToken, profile, next) {
    // if (profile.id.toString() === user.facebookId.toString()) {
    //     return next(null, user.id);
    // }
    next(new Error('no user found with given facebook id'));
}));
