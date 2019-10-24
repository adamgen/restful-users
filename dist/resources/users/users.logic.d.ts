import { Request } from "express";
export declare const getUsers: (req: Request) => Promise<any>;
export declare const postUsers: (user: any) => Promise<import("./users.schema").UserDocument>;
export declare const putUsers: (req: Request) => Promise<import("./users.schema").UserDocument>;
export declare const deleteUsers: (req: Request) => Promise<import("./users.schema").UserDocument>;
export declare const validateEmailByToken: (token: string) => Promise<false | import("./users.schema").UserDocument>;
