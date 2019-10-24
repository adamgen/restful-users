import './config/passport';
import { expressPassportSetupMiddleware } from './init-middleware';
export { router as usersSessionsRouter } from './resources/router';
export declare const suggestedMiddleware: typeof expressPassportSetupMiddleware;
export { User } from './resources/users/users.schema';
export * from './types/index.type';
