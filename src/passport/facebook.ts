import passport from 'passport';
import passportFacebook from 'passport-facebook';
import { user } from './user';

passport.use(new passportFacebook.Strategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3001/auth/facebook/callback"
}, function (accessToken, refreshToken, profile, next) {
    if (profile.id.toString() === user.facebookId.toString()) {
        return next(null, user.id);
    }
    next(new Error('no user found with given facebook id'));
}));
