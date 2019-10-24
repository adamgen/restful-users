"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function signToken(obj) {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jsonwebtoken_1.default.sign(obj, process.env.JWT_SECRET);
}
exports.signToken = signToken;
function verifyToken(token) {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
}
exports.verifyToken = verifyToken;
function hashPassword(password) {
    return bcrypt_nodejs_1.default.hashSync(password, bcrypt_nodejs_1.default.genSaltSync(10));
}
exports.hashPassword = hashPassword;
function comparePasswords(data, hash) {
    return bcrypt_nodejs_1.default.compareSync(data, hash);
}
exports.comparePasswords = comparePasswords;
function isEmailString(email) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}
exports.isEmailString = isEmailString;
function sendEmail(msg) {
    if (!process.env.SENDGRID_API_KEY) {
        throw new Error('SENDGRID_API_KEY not found');
    }
    mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
    return mail_1.default.send(msg);
}
exports.sendEmail = sendEmail;
//# sourceMappingURL=users.utils.js.map