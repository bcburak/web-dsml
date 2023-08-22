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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set("strictQuery", false);
var config = require("config");
const dbUrl = (_a = process.env.MONGO_DB_URL) !== null && _a !== void 0 ? _a : "null"; //`mongodb+srv://webflowdb:wvWoEvkHUHgcSKGP@web-flow-dsml-cluster.cmisbke.mongodb.net/?retryWrites=true&w=majority`;
// mongodb+srv://webflowdb:wvWoEvkHUHgcSKGP@web-flow-dsml-cluster.cmisbke.mongodb.net/?retryWrites=true&w=majority
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(dbUrl);
        console.log("Database connected...");
    }
    catch (error) {
        console.log(error.message);
        setTimeout(connectDB, 5000);
    }
});
exports.default = connectDB;
//# sourceMappingURL=connectDB.js.map