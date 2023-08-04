import { DocumentType } from "@typegoose/typegoose";
const config = require("config");
import { CookieOptions, NextFunction, Request, Response } from "express";
import {
  createTree,
  findAndUpdateTree,
  findTreeByUserId,
} from "../services/tree.service";
import {
  findAndUpdateFlowData,
  findFlowDataByUserId,
} from "../services/flow.service";

const userId = "640f65f14637a185a8ddcadc";
export const createUpdateFlowData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    var flowFileName = req.body.flowFileName;
    var flowFileData = req.body.flowFileData;
    console.log("flowFileName", req.body);
    console.log("flowFileData", req.body.flowFileName);
    // let userId = "640f65f14637a185a8ddcadc";

    const flow = await findAndUpdateFlowData(
      { userId, flowFileName },
      {
        flowFileName,
        flowFileData,
      },
      {
        upsert: true,
        runValidators: false,
        new: true,
        lean: true,
      }
    );
    console.log("flow info: ", flow);
    return res;
  } catch (err: any) {
    console.log("Failed to post flow data", err);
  }
};
export const getFlowByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const fileName = req.query.flowFileName as string;
    console.log("fileName", fileName);
    const flow = await findFlowDataByUserId(userId, fileName);

    console.log("flow by user id info: ", flow);
    res.json(flow);
  } catch (err: any) {
    console.log("Failed to get flow data", err);
  }
};
