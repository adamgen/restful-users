import { Request, Response, NextFunction } from 'express';

import { getUsers, postUsers } from './users.logic';

export async function handleGetUsers(req: Request, res: Response, next: NextFunction) {
    const { search } = req.query;
    const jsonResult = await getUsers().catch(a => a);
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
