"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./config/dotenv");
const init_middleware_1 = require("./init-middleware");
require("./config/passport/util");
require("./config/passport/local");
require("./config/passport/facebook");
require("./config/mongo");
const router_1 = require("./resources/router");
const app = express_1.default();
app.use(init_middleware_1.expressPassportSetupMiddleware());
app.use(router_1.router);
app.listen(3001);
//# sourceMappingURL=app.js.map