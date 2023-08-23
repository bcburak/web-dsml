import express from "express";
import { login } from "../controllers/auth.controller";
import {
  createUpdateTree,
  getTreeByUserId,
} from "../controllers/tree.controller";
import {
  createUpdateFlowData,
  getFlowByUserId,
  getFlowDataByFileName,
} from "../controllers/flow.controller";

const router = express.Router();
console.log("get auth point");

router.get("/getTreeByUserId", getTreeByUserId);
router.post("/createTree", createUpdateTree);

router.post("/createFlowData", createUpdateFlowData);
router.get("/getFlowDataByUserId", getFlowByUserId);
router.get("/getFlowDataByFileName", getFlowDataByFileName);

router.post("/login", login);

router.use(async (req, res, next) => {
  // const user = await db.user.findFirst({where: { id:  req.session.userId }})
  // req.userID = user
  next();
});

export default router;
