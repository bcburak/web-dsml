import { omit } from "lodash";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { excludedFields } from "../controllers/auth.controller";
import treeModel, { Tree } from "../models/tree.model";

// CreateUser service
export const createTree = async (input: Partial<Tree>) => {
  const tree = await treeModel.create(input);
  return omit(tree.toJSON(), excludedFields);
};

// Find one user by any fields
export const findTree = async (
  query: FilterQuery<Tree>,
  options: QueryOptions = {}
) => {
  return await treeModel.findOne(query, {}, options).select("+treeValue");
};

export const findTreeByUserId = async (userId: string) => {
  return await treeModel.find({ userId }, "+treeValue");
};

export const findAndUpdateTree = async (
  query: FilterQuery<Tree>,
  update: UpdateQuery<Tree>,
  options: QueryOptions
) => {
  return await treeModel.findOneAndUpdate(query, update, options);
};
