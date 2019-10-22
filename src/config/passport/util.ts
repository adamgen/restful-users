import passport from 'passport';

passport.serializeUser((id, done) => {
    if (id) {
        return done(null, id);
    }

    done(new Error('failed to serialize user by id ' + id));
});

passport.deserializeUser(function (id, done) {
    if (id) {
        return done(null, id);
    }
    done(new Error('user with given id not found'));
});