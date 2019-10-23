import './config/passport';
import { expressPassportSetupMiddleware } from './init-middleware';
export { router  as usersSessionsRouter} from './resources/router';
export const suggestedMiddleware = expressPassportSetupMiddleware;
