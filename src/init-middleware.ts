
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import passport from 'passport';

export function expressPassportSetupMiddleware() {
    return [
        cookieParser(),
        bodyParser.urlencoded({ extended: false }),
        bodyParser.json(),
        expressSession({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: false,
        }),
        passport.initialize(),
        passport.session(),
    ];
}