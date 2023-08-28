import { DocumentType } from "@typegoose/typegoose";
const config = require("config");
import { CookieOptions, NextFunction, Request, Response } from "express";
import { findAndUpdateTree, findTreeByUserId } from "../services/tree.service";
import connectDB from "../utils/connectDB";

export const createUpdateTree = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    var treeValue = req.body.treeValue;
    var userId = req.body.userId;
    connectDB();
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
    console.log("tree updated: ", tree);
    res.status(201).json(tree);
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
    const userId = req.query.userId as string;
    connectDB();
    const tree = await findTreeByUserId(userId);

    console.log("tree by user id info: ", tree);
    res.json(tree);
  } catch (err: any) {
    console.log("Failed to get tree data", err);
  }
};
