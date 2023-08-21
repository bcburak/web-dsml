import { omit } from "lodash";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { excludedFields } from "../controllers/auth.controller";
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

export const findFlowDataByFileName = async (
  fileName: string,
  userId: string
) => {
  const regex = new RegExp(fileName, "i"); // 'i' flag makes the search case-insensitive
  return await flowModel
    .find({ flowFileName: regex, userId })
    .select("+flowFileData");
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
