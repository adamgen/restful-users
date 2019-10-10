import passport from 'passport';
import passportLocal from 'passport-local';

const user = {
    id: 1,
    name: 'adam',
    age: 29,
    validPassword: (password: string) => password === '123'
};

passport.serializeUser((userId, done) => {
    if (userId === 1) {
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

passport.use(new passportLocal.Strategy(function passportLocalCallback(username, password, next) {
    if (user.name !== username) {
        return next(null, false, { message: 'Incorrect username.' });
    }
    if (!user.validPassword(password)) {
        return next(null, false, { message: 'Incorrect password.' });
    }

    return next(null, user.id);
}));
