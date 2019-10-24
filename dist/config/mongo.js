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
const chalk_1 = __importDefault(require("chalk"));
const mongoose_1 = __importDefault(require("mongoose"));
const getConnectionString = () => process.env.MONGODB_URI
    ? process.env.MONGODB_URI
    : 'mongodb://localhost/users';
exports.connectToDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const promise = mongoose_1.default.connect(getConnectionString(), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    // mongoose.set('debug', true);
    return promise;
});
exports.connectToDb()
    .then(() => {
    console.log(chalk_1.default.green('db connected'));
})
    .catch((err) => {
    console.log(chalk_1.default.red('db connection error'), err);
});
//# sourceMappingURL=mongo.js.map