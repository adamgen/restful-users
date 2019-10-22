import { Request, Response, NextFunction } from 'express';

import { getUsers, postUsers, validateEmailByToken, deleteUsers, putUsers } from './users.logic';
import { verifyToken, isEmailString } from './users.utils';

export async function handleGetUsersValidateToken(req: Request, res: Response, next: NextFunction) {
    const { token } = req.query;
    const user = await validateEmailByToken(token)
        .catch(err => {
            res.json(err);
        });

    if (user) {
        return req.login(user._id, next);
    }

    next();
};

export async function handleGetUsers(req: Request, res: Response, next: NextFunction) {
    const { search } = req.query;
    const jsonResult = await getUsers(req).catch(a => a);
    res.send(jsonResult);
};

export async function handlePostUsers(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    const promise = postUsers(body)
    promise.catch(a => {
        console.log(a);
        res.json(a.message);
    });
    const user = await promise;
    req.login(user._id, err => {
        if (err) {
            return res.json(err);
        }
        res.json(user);

    });
};

export async function handlePutUsers(req: Request, res: Response, next: NextFunction) {
    const jsonResult = await putUsers(req)
        .catch(err => err);

    res.json(jsonResult);
};

export async function handleDeleteUsers(req: Request, res: Response, next: NextFunction) {
    const jsonResult = await deleteUsers(req)
        .catch(a => {
            console.log(a);
            res.json(a.message);
        });
    res.json('user was deleted');
};
