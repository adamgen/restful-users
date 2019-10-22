import { Router } from 'express';
import { handleGetUsers, handlePostUsers, handleGetUsersValidateToken, handleDeleteUsers, handlePutUsers } from './users/users.handler';
import { handleDeleteSession, handleGetSession, handlePostSession } from './sessions/sessions.handlers';
import passport from 'passport';

export const router = Router();

router.get('/users', handleGetUsersValidateToken);
router.get('/users', handleGetUsers);
router.post('/users', handlePostUsers);
router.put('/users', handlePutUsers);
router.delete('/users', handleDeleteUsers);

router.get('/session', passport.authenticate('local'), handleGetSession);
router.get('/session/facebook',
    passport.authenticate('facebook', {
        failureRedirect: '/login',
        scope: ['email'],
    }),
    handleGetSession,
);
router.post('/sessions', handlePostSession);
router.delete('/sessions', handleDeleteSession);
