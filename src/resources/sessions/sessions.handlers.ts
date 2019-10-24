import { Request, NextFunction, Response } from "express"
import { postSession } from './sessions.logic';

export const handleGetSession = function handleGetSessionLocal(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        const redirectUrl = process.env.AUTH_SUCCESS_REDIRECT_PATH || '/users';
        return res.redirect(redirectUrl + '?fresh-login');
    }
    res.json('no authenticated');
}

export const handlePostSession = async function handlePostSession(req: Request, res: Response, next: NextFunction) {
    await postSession(req);
    res.json('we have sent you a recovery email');
}

export const handleDeleteSession = function handleDeleteSession(req: Request, res: Response, next: NextFunction) {
    req.logOut();
    res.json('session ended, logged out');
}