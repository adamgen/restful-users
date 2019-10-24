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
const users_logic_1 = require("./users.logic");
function handleGetUsersValidateToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { token } = req.query;
        const user = yield users_logic_1.validateEmailByToken(token)
            .catch(err => {
            res.json(err);
        });
        if (user) {
            return req.login(user._id, next);
        }
        next();
    });
}
exports.handleGetUsersValidateToken = handleGetUsersValidateToken;
;
function handleGetUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { search } = req.query;
        const jsonResult = yield users_logic_1.getUsers(req).catch(a => a);
        res.send(jsonResult);
    });
}
exports.handleGetUsers = handleGetUsers;
;
function handlePostUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body } = req;
        const promise = users_logic_1.postUsers(body);
        promise.catch(a => {
            console.log(a);
            res.json(a.message);
        });
        const user = yield promise;
        req.login(user._id, err => {
            if (err) {
                return res.json(err);
            }
            res.json(user);
        });
    });
}
exports.handlePostUsers = handlePostUsers;
;
function handlePutUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const jsonResult = yield users_logic_1.putUsers(req)
            .catch(err => err);
        res.json(jsonResult);
    });
}
exports.handlePutUsers = handlePutUsers;
;
function handleDeleteUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const jsonResult = yield users_logic_1.deleteUsers(req)
            .catch(a => {
            console.log(a);
            res.json(a.message);
        });
        res.json('user was deleted');
    });
}
exports.handleDeleteUsers = handleDeleteUsers;
;
//# sourceMappingURL=users.handler.js.map