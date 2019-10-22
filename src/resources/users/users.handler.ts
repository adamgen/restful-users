import { Request, Response, NextFunction } from 'express';

import { getUsers, postUsers, validateEmailByToken, deleteUsers, putUsers } from './users.logic';
import { verifyToken, isEmailString } from './users.utils';

export async function handleGetUsersValidateToken(req: Request, res: Response, next: NextFunction) {
    const { token } = req.query;
    await validateEmailByToken(token)
        .catch(err => {
            res.json(err);
        });

    next();
};

export async function handleGetUsers(req: Request, res: Response, next: NextFunction) {
    const { search } = req.query;
    const jsonResult = await getUsers(req).catch(a => a);
    res.send(jsonResult);
};

export async function handlePostUsers(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    const jsonResult = await postUsers(body)
        .catch(a => {
            console.log(a);
            res.json(a.message);
        });
    res.json(jsonResult);
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
