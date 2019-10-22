import { Request, NextFunction, Response } from "express"


export const handleDeleteSession = function handleDeleteSession(req: Request, res: Response, next: NextFunction) {
    req.logOut();
    res.json('session ended, logged out');
}