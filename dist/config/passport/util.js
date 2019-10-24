"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
passport_1.default.serializeUser((id, done) => {
    if (id) {
        return done(null, id);
    }
    done(new Error('failed to serialize user by id ' + id));
});
passport_1.default.deserializeUser(function (id, done) {
    if (id) {
        return done(null, id);
    }
    done(new Error('user with given id not found'));
});
//# sourceMappingURL=util.js.map