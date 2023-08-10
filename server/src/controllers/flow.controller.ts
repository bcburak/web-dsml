import { DocumentType } from "@typegoose/typegoose";
const config = require("config");
import { CookieOptions, NextFunction, Request, Response } from "express";

import {
  findAndUpdateFlowData,
  findFlowDataByUserId,
} from "../services/flow.service";

// const userId = "640f65f14637a185a8ddcadc";
export const createUpdateFlowData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    var flowFileName = req.body.flowFileName;
    var flowFileData = req.body.flowFileData;
    var userId = req.body.userId;
    console.log("flowFileName", req.body);
    console.log("flowFileData userId", userId);
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
    // const userId = "640f65f14637a185a8ddcadc";
    const fileName = req.query.flowFileName as string;
    const userId = req.query.userId as string;
    console.log("userId getFlowByUserId", userId);
    const flow = await findFlowDataByUserId(userId, fileName);

    console.log("flow by user id info: ", flow);
    res.json(flow);
  } catch (err: any) {
    console.log("Failed to get flow data", err);
  }
};
