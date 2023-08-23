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
exports.getFlowDataByFileName = exports.getFlowByUserId = exports.createUpdateFlowData = void 0;
const config = require("config");
const flow_service_1 = require("../services/flow.service");
const connectDB_1 = __importDefault(require("../utils/connectDB"));
// const userId = "640f65f14637a185a8ddcadc";
const createUpdateFlowData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var flowFileName = req.body.flowFileName;
        var flowFileData = req.body.flowFileData;
        var userId = req.body.userId;
        console.log("flowFileName", req.body);
        console.log("flowFileData userId", userId);
        // let userId = "640f65f14637a185a8ddcadc";
        (0, connectDB_1.default)();
        const flow = yield (0, flow_service_1.findAndUpdateFlowData)({ userId, flowFileName }, {
            flowFileName,
            flowFileData,
        }, {
            upsert: true,
            runValidators: false,
            new: true,
            lean: true,
        });
        console.log("flow info: ", flow);
        return res;
    }
    catch (err) {
        console.log("Failed to post flow data", err);
    }
});
exports.createUpdateFlowData = createUpdateFlowData;
const getFlowByUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const userId = "640f65f14637a185a8ddcadc";
        const fileName = req.query.flowFileName;
        const userId = req.query.userId;
        console.log("userId getFlowByUserId", userId);
        (0, connectDB_1.default)();
        const flow = yield (0, flow_service_1.findFlowDataByUserId)(userId, fileName);
        console.log("flow by user id info: ", flow);
        res.json(flow);
    }
    catch (err) {
        console.log("Failed to get flow data", err);
    }
});
exports.getFlowByUserId = getFlowByUserId;
const getFlowDataByFileName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileName = req.query.flowFileName;
        const userId = req.query.userId;
        (0, connectDB_1.default)();
        const flow = yield (0, flow_service_1.findFlowDataByFileName)(fileName, userId);
        res.json(flow);
    }
    catch (error) {
        console.log("error while getting flow data");
    }
});
exports.getFlowDataByFileName = getFlowDataByFileName;
//# sourceMappingURL=flow.controller.js.map