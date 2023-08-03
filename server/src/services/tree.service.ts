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

// CreateUser service
export const createTree = async (input: Partial<Tree>) => {
  const tree = await treeModel.create(input);
  return omit(tree.toJSON(), excludedFields);
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
export const findTree = async (
  query: FilterQuery<Tree>,
  options: QueryOptions = {}
) => {
  return await treeModel.findOne(query, {}, options).select("+treeValue");
};

export const findTreeByUserId = async (userId: string) => {
  return await treeModel.find({ userId }, "treeValue").lean();
};

export const findAndUpdateTree = async (
  query: FilterQuery<Tree>,
  update: UpdateQuery<Tree>,
  options: QueryOptions
) => {
  return await treeModel.findOneAndUpdate(query, update, options);
};
