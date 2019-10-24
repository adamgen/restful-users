"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sessions_logic_1 = require("./sessions.logic");
exports.handleGetSession = function handleGetSessionLocal(req, res, next) {
    if (req.isAuthenticated()) {
        const redirectUrl = process.env.AUTH_SUCCESS_REDIRECT_PATH || '/users';
        return res.redirect(redirectUrl + '?fresh-login');
    }
    res.json('no authenticated');
};
exports.handlePostSession = function handlePostSession(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield sessions_logic_1.postSession(req);
        res.json('we have sent you a recovery email');
    });
};
exports.handleDeleteSession = function handleDeleteSession(req, res, next) {
    req.logOut();
    res.json('session ended, logged out');
};
//# sourceMappingURL=sessions.handlers.js.map