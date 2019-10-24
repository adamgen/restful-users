/// <reference types="request" />
export declare function signToken(obj: any): string;
export declare function verifyToken(token: string): unknown;
export declare function hashPassword(password: string): string;
export declare function comparePasswords(data: string, hash: string): boolean;
export declare function isEmailString(email: string): boolean;
export declare function sendEmail(msg: {
    to: string;
    from: string;
    subject: string;
    text?: string;
    html: string;
}): Promise<[import("request").Response, {}]>;
