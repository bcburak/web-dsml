import { string } from "zod";
import { omit } from "lodash";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import config from "config";
import userModel, { User } from "../models/user.model";
import userProfileModel, { UserProfile } from "../models/userprofile.model";
import { excludedFields } from "../controllers/auth.controller";
import { signJwt } from "../utils/jwt";
import redisClient from "../utils/connectRedis";
import { DocumentType } from "@typegoose/typegoose";

import jwt, { SignOptions } from "jsonwebtoken";
import treeModel, { Tree } from "../models/tree.model";
import flowModel, { FlowLayout } from "../models/flowLayout.model";

// CreateUser service
export const createFlowData = async (input: Partial<FlowLayout>) => {
  const flow = await flowModel.create(input);
  return omit(flow.toJSON(), excludedFields);
};

// // Find User by Id
// export const findUserById = async (id: string) => {
//   const user = await treeModel.find(id).lean();
//   return omit(user, excludedFields);
// };

// // Find All users
// export const findAllUsers = async () => {
//   return await userModel.find();
// };

// Find one user by any fields
export const findFlowData = async (
  query: FilterQuery<FlowLayout>,
  options: QueryOptions = {}
) => {
  return await flowModel.findOne(query, {}, options).select("+flowFileData");
};

export const findFlowDataByUserId = async (
  userId: string,
  fileName: string
) => {
  return await flowModel
    .find({ userId, flowFileName: fileName })
    .select("+flowFileData");
};

export const findAndUpdateFlowData = async (
  query: FilterQuery<FlowLayout>,
  update: UpdateQuery<FlowLayout>,
  options: QueryOptions
) => {
  return await flowModel.findOneAndUpdate(query, update, options);
};
