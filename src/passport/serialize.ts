import passport from 'passport';
import { user } from './user';

passport.serializeUser((userId, done) => {
    if (userId === user.id) {
        return done(null, user.id);
    }

    done(new Error('failed to serialize user by id ' + userId));
});

passport.deserializeUser(function (id, done) {
    if (id == user.id) {
        console.log({ id });
        return done(null, user);
    }
    done(new Error('user with given id not found'));
});