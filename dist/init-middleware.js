"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongoStore = connect_mongo_1.default(express_session_1.default);
function expressPassportSetupMiddleware() {
    return [
        cookie_parser_1.default(),
        body_parser_1.default.urlencoded({ extended: false }),
        body_parser_1.default.json(),
        express_session_1.default({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: false,
            store: new mongoStore({
                mongooseConnection: mongoose_1.default.connection
            }),
        }),
        passport_1.default.initialize(),
        passport_1.default.session(),
    ];
}
exports.expressPassportSetupMiddleware = expressPassportSetupMiddleware;
//# sourceMappingURL=init-middleware.js.map