import passport from 'passport';
import passportFacebook from 'passport-facebook';
import { User } from '../../resources/users/users.schema';

passport.use(new passportFacebook.Strategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `http://${process.env.API_URL}/sessions/facebook`,
    profileFields: ['displayName', 'id', 'emails', 'name', 'photos'],
}, async function passportFacebook(accessToken, refreshToken, profile, next) {
    for (let index = 0; index < profile.emails.length; index++) {
        const email = profile.emails[index].value;
        const userByEmail = await User.findOne({ email });
        if (userByEmail) {
            return next(null, userByEmail._id);
        }

        const userFacebookId = await User.findOne({ facebookProfile: { id: profile.id } });
        if (userFacebookId) {
            return next(null, userFacebookId._id);
        }
    }

    if (profile.emails.length > 0 && profile.emails[0].value) {
        const user = await User.create({
            email: profile.emails[0].value,
            facebookProfile: profile,
        });
        return next(null, user._id);
    }

    const user = await User.create({
        facebookProfile: profile,
    });
    return next(null, user._id);
}));
