import passport from 'passport';
import passportLocal from 'passport-local';
import { User } from '../../resources/users/users.schema';
import { comparePasswords } from '../../resources/users/users.utils';

passport.use(new passportLocal.Strategy(async function passportLocalCallback(username, password, next) {
    const promise = User.findOne({ email: username });
    promise.catch(next);
    const user = await promise;
    if (!user) {
        return next(new Error('User password mismatch'));
    }
    if (!comparePasswords(password, user.password)) {
        return next(new Error('User password mismatch'));
    }

    return next(null, user._id);
}));
