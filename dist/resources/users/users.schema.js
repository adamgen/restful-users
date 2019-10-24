"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schemaObj = {
    email: String,
    password: String,
    facebookProfile: mongoose_1.Schema.Types.Mixed,
    emailValidated: {
        default: false,
        type: Boolean,
    },
};
exports.UserSchema = new mongoose_1.Schema(schemaObj);
exports.User = mongoose_1.model('User', exports.UserSchema);
//# sourceMappingURL=users.schema.js.map