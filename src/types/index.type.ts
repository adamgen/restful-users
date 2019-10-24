import  'passport';

declare global {
    namespace Express {
        interface User {
            id: number;
            name: string;
            age: number;
        }

        interface Request {
            data?: any;
        }
    }
}
