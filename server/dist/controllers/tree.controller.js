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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTreeByUserId = exports.createUpdateTree = void 0;
const config = require("config");
const tree_service_1 = require("../services/tree.service");
const createUpdateTree = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var treeValue = req.body.treeValue;
        var userId = req.body.userId;
        const tree = yield (0, tree_service_1.findAndUpdateTree)({ userId }, {
            treeValue,
        }, {
            upsert: true,
            runValidators: false,
            new: true,
            lean: true,
        });
        // console.log("tree info: ", tree);
        return res;
    }
    catch (err) {
        console.log("Failed to post tree data", err);
    }
});
exports.createUpdateTree = createUpdateTree;
const getTreeByUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.userId;
        const tree = yield (0, tree_service_1.findTreeByUserId)(userId);
        console.log("tree by user id info: ", tree);
        res.json(tree);
    }
    catch (err) {
        console.log("Failed to get tree data", err);
    }
});
exports.getTreeByUserId = getTreeByUserId;
//# sourceMappingURL=tree.controller.js.map