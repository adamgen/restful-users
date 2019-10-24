"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_handler_1 = require("./users/users.handler");
const sessions_handlers_1 = require("./sessions/sessions.handlers");
const passport_1 = __importDefault(require("passport"));
exports.router = express_1.Router();
exports.router.get('/users', users_handler_1.handleGetUsersValidateToken);
exports.router.get('/users', users_handler_1.handleGetUsers);
exports.router.post('/users', users_handler_1.handlePostUsers);
exports.router.put('/users', users_handler_1.handlePutUsers);
exports.router.delete('/users', users_handler_1.handleDeleteUsers);
exports.router.get('/sessions', passport_1.default.authenticate('local'), sessions_handlers_1.handleGetSession);
exports.router.get('/sessions/facebook', passport_1.default.authenticate('facebook', {
    failureRedirect: '/login',
    scope: ['emails', 'photos', 'name'],
}), sessions_handlers_1.handleGetSession);
exports.router.post('/sessions', sessions_handlers_1.handlePostSession);
exports.router.delete('/sessions', sessions_handlers_1.handleDeleteSession);
//# sourceMappingURL=router.js.map