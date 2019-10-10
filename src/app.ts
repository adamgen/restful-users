import express from 'express';
import passport from 'passport';
import { expressPassportSetupMiddleware } from './init-middleware';
import './passport';

const app = express();

app.use(expressPassportSetupMiddleware());

app.post('/login', passport.authenticate('local'), function (req, res, next) {
    res.json('login with success');
});

app.get('/me', function (req, res, next) {
    if (req.isAuthenticated()) {
        return res.json(req.user);
    }
    res.json('no authenticated');
});

app.listen(3001);
