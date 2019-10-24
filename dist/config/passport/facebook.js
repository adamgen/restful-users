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
const passport_facebook_1 = __importDefault(require("passport-facebook"));
const users_schema_1 = require("../../resources/users/users.schema");
passport_1.default.use(new passport_facebook_1.default.Strategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `http://${process.env.API_URL}/sessions/facebook`,
    profileFields: ['displayName', 'id', 'emails', 'name', 'photos'],
}, function passportFacebook(accessToken, refreshToken, profile, next) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let index = 0; index < profile.emails.length; index++) {
            const email = profile.emails[index].value;
            const userByEmail = yield users_schema_1.User.findOne({ email });
            if (userByEmail) {
                return next(null, userByEmail._id);
            }
            const userFacebookId = yield users_schema_1.User.findOne({ facebookProfile: { id: profile.id } });
            if (userFacebookId) {
                return next(null, userFacebookId._id);
            }
        }
        if (profile.emails.length > 0 && profile.emails[0].value) {
            const user = yield users_schema_1.User.create({
                email: profile.emails[0].value,
                facebookProfile: profile,
            });
            return next(null, user._id);
        }
        const user = yield users_schema_1.User.create({
            facebookProfile: profile,
        });
        return next(null, user._id);
    });
}));
//# sourceMappingURL=facebook.js.map