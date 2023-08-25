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
exports.findAndUpdateFlowData = exports.findFlowDataByUserId = exports.findFlowDataByFileName = exports.findFlowData = exports.createFlowData = void 0;
const lodash_1 = require("lodash");
const auth_controller_1 = require("../controllers/auth.controller");
const flowLayout_model_1 = __importDefault(require("../models/flowLayout.model"));
// CreateUser service
const createFlowData = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const flow = yield flowLayout_model_1.default.create(input);
    return (0, lodash_1.omit)(flow.toJSON(), auth_controller_1.excludedFields);
});
exports.createFlowData = createFlowData;
// // Find User by Id
// export const findUserById = async (id: string) => {
//   const user = await treeModel.find(id).lean();
//   return omit(user, excludedFields);
// };
// // Find All users
// export const findAllUsers = async () => {
//   return await userModel.find();
// };
// Find one user by any fields
const findFlowData = (query, options = {}) => __awaiter(void 0, void 0, void 0, function* () {
    return yield flowLayout_model_1.default.findOne(query, {}, options).select("+flowFileData");
});
exports.findFlowData = findFlowData;
const findFlowDataByFileName = (fileName, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const regex = new RegExp(fileName, "i"); // 'i' flag makes the search case-insensitive
    return yield flowLayout_model_1.default
        .find({ flowFileName: regex, userId })
        .select("+flowFileData");
});
exports.findFlowDataByFileName = findFlowDataByFileName;
const findFlowDataByUserId = (userId, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    return yield flowLayout_model_1.default
        .find({ userId, flowFileName: fileName })
        .select("+flowFileData");
});
exports.findFlowDataByUserId = findFlowDataByUserId;
const findAndUpdateFlowData = (query, update, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield flowLayout_model_1.default.findOneAndUpdate(query, update, options);
    }
    catch (error) {
        console.log("findAndUpdateFlowData", error);
        return error;
    }
});
exports.findAndUpdateFlowData = findAndUpdateFlowData;
//# sourceMappingURL=flow.service.js.map