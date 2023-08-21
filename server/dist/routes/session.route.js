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
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const tree_controller_1 = require("../controllers/tree.controller");
const flow_controller_1 = require("../controllers/flow.controller");
// const jwt = require("jsonwebtoken");
// const { OAuth2Client } = require("google-auth-library");
// const clientId =
//   "126611791804-882ill00ssfff57mq6m0df3sujj7knnf.apps.googleusercontent.com";
// const client = new OAuth2Client(clientId); //(process.env.CLIENT_ID);
const router = express_1.default.Router();
console.log("get auth point");
router.get("/getTreeByUserId", tree_controller_1.getTreeByUserId);
router.post("/createTree", tree_controller_1.createUpdateTree);
router.post("/createFlowData", flow_controller_1.createUpdateFlowData);
router.get("/getFlowDataByUserId", flow_controller_1.getFlowByUserId);
router.get("/getFlowDataByFileName", flow_controller_1.getFlowDataByFileName);
router.post("/login", auth_controller_1.login);
router.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const user = await db.user.findFirst({where: { id:  req.session.userId }})
    // req.userID = user
    next();
}));
exports.default = router;
//# sourceMappingURL=session.route.js.map