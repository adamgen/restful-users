import { Request, NextFunction, Response } from "express";
export declare const handleGetSession: (req: Request, res: Response, next: NextFunction) => void;
export declare const handlePostSession: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const handleDeleteSession: (req: Request, res: Response, next: NextFunction) => void;
