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
const users_schema_1 = require("../users/users.schema");
const users_utils_1 = require("../users/users.utils");
exports.postSession = function postSession(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const promise = users_schema_1.User.findOne({ email: req.body.email });
        promise.catch(err => {
            console.log(err);
        });
        const user = yield promise;
        const token = users_utils_1.signToken({ email: user.email });
        users_utils_1.sendEmail({
            to: user.email,
            from: 'auth@example.com',
            subject: 'Password reset',
            html: `
<h1>Your password reset</h1>
You requested to reset your password for our app, you can log in with <a href="http://${process.env.APP_URL}/users?token=${token}">this link</a> and change password once logged in.
`,
        });
    });
};
//# sourceMappingURL=sessions.logic.js.map