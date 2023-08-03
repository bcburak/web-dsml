import { DocumentType } from "@typegoose/typegoose";
const config = require("config");
import { CookieOptions, NextFunction, Request, Response } from "express";
import {
  createTree,
  findAndUpdateTree,
  findTreeByUserId,
} from "../services/tree.service";

export const createUpdateTree = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    var treeValue = req.body.treeValue;
    let userId = "640f65f14637a185a8ddcadc";

    const tree = await findAndUpdateTree(
      { userId },
      {
        treeValue,
      },
      {
        upsert: true,
        runValidators: false,
        new: true,
        lean: true,
      }
    );
    console.log("tree info: ", tree);
    return res;
  } catch (err: any) {
    console.log("Failed to post tree data", err);
  }
};
export const getTreeByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let userId = "640f65f14637a185a8ddcadc";

    const tree = await findTreeByUserId(userId);

    console.log("tree by user id info: ", tree);
    res.json(tree);
  } catch (err: any) {
    console.log("Failed to get tree data", err);
  }
};
