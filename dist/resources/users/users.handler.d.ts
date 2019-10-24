import { Request, Response, NextFunction } from 'express';
export declare function handleGetUsersValidateToken(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function handleGetUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function handlePostUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function handlePutUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function handleDeleteUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
