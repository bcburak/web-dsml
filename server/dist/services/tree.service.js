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
exports.findAndUpdateTree = exports.findTreeByUserId = exports.findTree = exports.createTree = void 0;
const lodash_1 = require("lodash");
const auth_controller_1 = require("../controllers/auth.controller");
const tree_model_1 = __importDefault(require("../models/tree.model"));
// CreateUser service
const createTree = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const tree = yield tree_model_1.default.create(input);
    return (0, lodash_1.omit)(tree.toJSON(), auth_controller_1.excludedFields);
});
exports.createTree = createTree;
// Find one user by any fields
const findTree = (query, options = {}) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tree_model_1.default.findOne(query, {}, options).select("+treeValue");
});
exports.findTree = findTree;
const findTreeByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tree_model_1.default.find({ userId }, "+treeValue");
});
exports.findTreeByUserId = findTreeByUserId;
const findAndUpdateTree = (query, update, options) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tree_model_1.default.findOneAndUpdate(query, update, options);
});
exports.findAndUpdateTree = findAndUpdateTree;
//# sourceMappingURL=tree.service.js.map