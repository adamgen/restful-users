import express from 'express';
import passport from 'passport';
import { expressPassportSetupMiddleware } from './init-middleware';
import './config/passport/util';
import './config/passport/local';
import './config/passport/facebook';
import './config/mongo';
import './config/dotenv';
import { router } from './resources/router';

const app = express();

app.use(expressPassportSetupMiddleware());
app.use(router);
app.get('/session', passport.authenticate('local'), function (req, res, next) {
    res.json('login with success');
});

app.get('/me', function (req, res, next) {
    if (req.isAuthenticated()) {
        return res.json(req.user);
    }
    res.json('no authenticated');
});

app.listen(3001);

app.get('/auth/facebook',
    passport.authenticate('facebook', {
        failureRedirect: '/login',
        scope: ['email'],
    }),
    function (req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect('/me');
        }
        res.json('no authenticated');
    }
);
