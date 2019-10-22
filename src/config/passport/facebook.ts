import passport from 'passport';
import passportFacebook from 'passport-facebook';
import { User } from '../../resources/users/users.schema';

passport.use(new passportFacebook.Strategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3001/auth/facebook",
    profileFields: ['id', 'emails', 'name'],
}, async function passportFacebook(accessToken, refreshToken, profile, next) {
    for (let index = 0; index < profile.emails.length; index++) {
        const email = profile.emails[index].value;
        const user = await User.findOne({ email });
        if (user) {
            return next(null, user._id);
        }
    }

    if (profile.emails.length > 0 && profile.emails[0].value) {
        const user = await User.create({ email: profile.emails[0].value });
        return next(null, user._id);
    }

    const user = await User.create({ facebookId: profile.id });
    return next(null, user._id);
}));
