import express from "express";
import { googleOauthHandler } from "../controllers/auth.controller";
import {
  createUpdateTree,
  getTreeByUserId,
} from "../controllers/tree.controller";
import {
  createUpdateFlowData,
  getFlowByUserId,
} from "../controllers/flow.controller";

const router = express.Router();
console.log("get auth point");

router.get("/oauth/google", googleOauthHandler);
router.get("/getTreeByUserId", getTreeByUserId);
router.post("/createTree", createUpdateTree);

router.post("/createFlowData", createUpdateFlowData);
router.get("/getFlowDataByUserId", getFlowByUserId);

export default router;
