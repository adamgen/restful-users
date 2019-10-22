
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
const mongoStore = MongoStore(expressSession);

export function expressPassportSetupMiddleware() {
    return [
        cookieParser(),
        bodyParser.urlencoded({ extended: false }),
        bodyParser.json(),
        expressSession({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: false,
            store: new mongoStore({
                mongooseConnection: mongoose.connection
            }),
        }),
        passport.initialize(),
        passport.session(),
    ];
}