import { Request, NextFunction, Response } from "express"

export const handleGetSession = function handleGetSessionLocal(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        return res.redirect('/users');
    }
    res.json('no authenticated');
}

export const handleDeleteSession = function handleDeleteSession(req: Request, res: Response, next: NextFunction) {
    req.logOut();
    res.json('session ended, logged out');
}