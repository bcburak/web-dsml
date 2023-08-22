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
import connectDB from "../utils/connectDB";
// const jwt = require("jsonwebtoken");
// const { OAuth2Client } = require("google-auth-library");
// const clientId =
//   "126611791804-882ill00ssfff57mq6m0df3sujj7knnf.apps.googleusercontent.com";
// const client = new OAuth2Client(clientId); //(process.env.CLIENT_ID);

const router = express.Router();
console.log("get auth point");
router.get("/connect", connectDB);

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
