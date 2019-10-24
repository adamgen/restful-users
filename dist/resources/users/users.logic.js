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
const users_schema_1 = require("./users.schema");
const users_utils_1 = require("./users.utils");
exports.getUsers = function getUsers(req) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.isAuthenticated()) {
            return false;
        }
        const result = yield users_schema_1.User.findById(req.user).catch(a => a);
        return result;
    });
};
exports.postUsers = function postUsers(user) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof user.password !== 'string') {
            throw new Error('Password not provided');
        }
        if (typeof user.email !== 'string') {
            throw new Error('Email not provided');
        }
        if (!users_utils_1.isEmailString(user.email)) {
            throw new Error('Email is not valid');
        }
        const existingUser = yield users_schema_1.User.find({ email: user.email });
        if (existingUser.length > 0) {
            throw new Error('User with given email exists');
        }
        const password = users_utils_1.hashPassword(user.password);
        const newUser = yield users_schema_1.User.create({
            email: user.email,
            password,
        });
        const token = users_utils_1.signToken({ email: user.email });
        users_utils_1.sendEmail({
            to: user.email,
            from: 'auth@example.com',
            subject: 'Please validate your email',
            // text: 'and easy to do anywhere, even with Node.js',
            html: `
<h1>Hi!</h1>

You've registered as a user to our system, please approve by visiting <a href="http://${process.env.APP_URL}/users?token=${token}">this link</a>
`,
        })
            .then(res => {
            console.log(res);
        })
            .catch(err => {
            console.log(err);
        });
        return newUser;
    });
};
exports.putUsers = function putUsers(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password, oldPassword } = req.body;
        const promise = users_schema_1.User.findById(req.user);
        const user = yield promise;
        if (users_utils_1.isEmailString(email)) {
            user.email = email;
        }
        if (password && oldPassword && users_utils_1.comparePasswords(oldPassword, user.password)) {
            user.password = users_utils_1.hashPassword(password);
        }
        yield user.update(user);
        return user;
    });
};
exports.deleteUsers = function deleteUsers(req) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.isAuthenticated()) {
            throw new Error('User is not authenticated');
        }
        const user = yield users_schema_1.User.findById(req.user);
        if (user.email !== req.query.email) {
            throw new Error('unauthorized request');
        }
        return yield user.remove();
    });
};
exports.validateEmailByToken = function validateEmailByToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!token) {
            return false;
        }
        const decoded = users_utils_1.verifyToken(token);
        if (typeof decoded !== 'object') {
            throw new Error('Token is not valid');
        }
        const { email } = decoded;
        if (typeof email !== 'string' || !users_utils_1.isEmailString(email)) {
            throw new Error('The token content does not have a valid email');
        }
        const promise = users_schema_1.User.findOne({ email });
        const user = yield promise;
        promise.catch(err => {
            console.log(err);
        });
        yield user.update({ emailValidated: true });
        return user;
    });
};
//# sourceMappingURL=users.logic.js.map