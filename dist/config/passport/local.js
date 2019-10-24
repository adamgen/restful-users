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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const users_schema_1 = require("../../resources/users/users.schema");
const users_utils_1 = require("../../resources/users/users.utils");
passport_1.default.use(new passport_local_1.default.Strategy(function passportLocalCallback(username, password, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const promise = users_schema_1.User.findOne({ email: username });
        promise.catch(next);
        const user = yield promise;
        if (!user) {
            return next(new Error('User password mismatch'));
        }
        if (!users_utils_1.comparePasswords(password, user.password)) {
            return next(new Error('User password mismatch'));
        }
        return next(null, user._id);
    });
}));
//# sourceMappingURL=local.js.map