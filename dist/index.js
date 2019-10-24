"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./config/passport");
const init_middleware_1 = require("./init-middleware");
var router_1 = require("./resources/router");
exports.usersSessionsRouter = router_1.router;
exports.suggestedMiddleware = init_middleware_1.expressPassportSetupMiddleware;
var users_schema_1 = require("./resources/users/users.schema");
exports.User = users_schema_1.User;
//# sourceMappingURL=index.js.map