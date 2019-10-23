import express from 'express';
import './config/dotenv';
import { expressPassportSetupMiddleware } from './init-middleware';
import './config/passport/util';
import './config/passport/local';
import './config/passport/facebook';
import './config/mongo';
import { router } from './resources/router';

const app = express();

app.use(expressPassportSetupMiddleware());
app.use(router);

app.listen(3001);
