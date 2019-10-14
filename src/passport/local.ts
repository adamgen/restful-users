import passport from 'passport';
import passportLocal from 'passport-local';
import { user } from './user';

passport.use(new passportLocal.Strategy(function passportLocalCallback(username, password, next) {
    if (user.name !== username) {
        return next(null, false, { message: 'Incorrect username.' });
    }
    if (!user.validPassword(password)) {
        return next(null, false, { message: 'Incorrect password.' });
    }

    return next(null, user.id);
}));
