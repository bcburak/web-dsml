import { omit } from "lodash";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import userModel, { User } from "../models/user.model";
import userProfileModel, { UserProfile } from "../models/userprofile.model";
import { excludedFields } from "../controllers/auth.controller";

import jwt, { SignOptions } from "jsonwebtoken";

// CreateUser service
export const createUser = async (input: Partial<User>) => {
  const user = await userModel.create(input);
  return omit(user.toJSON(), excludedFields);
};

// Find User by Id
export const findUserById = async (id: string) => {
  const user = await userModel.findById(id).lean();
  return omit(user, excludedFields);
};

// Find All users
export const findAllUsers = async () => {
  return await userModel.find();
};

// Find one user by any fields
export const findUser = async (
  query: FilterQuery<User>,
  options: QueryOptions = {}
) => {
  return await userModel.findOne(query, {}, options).select("+password");
};

export const findAndUpdateUser = async (
  query: FilterQuery<User>,
  update: UpdateQuery<User>,
  options: QueryOptions
) => {
  try {
    return await userModel.findOneAndUpdate(query, update, options);
  } catch (error) {
    console.log("findAndUpdateUser", error);
  }
};

// CreateUser service
export const createUserProfile = async (input: Partial<UserProfile>) => {
  const user = await userProfileModel.create(input);
  return omit(user.toJSON(), excludedFields);
};

// Find User by Id
export const findUserProfileById = async (id: string) => {
  const user = await userProfileModel.findById(id).lean();
  return omit(user, excludedFields);
};

// Sign Token
// export const signToken = async (user: DocumentType<User>) => {
//   // Sign the access token
//   const access_token = signJwt({ sub: user._id }, 'accessTokenPrivateKey', {
//     expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
//   });

//   // Sign the refresh token
//   const refresh_token = signJwt({ sub: user._id }, 'refreshTokenPrivateKey', {
//     expiresIn: `${config.get<number>('refreshTokenExpiresIn')}m`,
//   });

//   // Create a Session
//   // redisClient.set(user._id, JSON.stringify(user), {
//   //   EX: 60 * 60,
//   // });

//   // Return access token
//   return { access_token, refresh_token };
// };

export const signToken = async (email: any) => {
  const access_token = jwt.sign({ email }, "ACCESS_TOKEN_PRIVATE_KEY", {
    expiresIn: "1d",
  });

  const refresh_token = jwt.sign({ email }, "REFRESH_TOKEN_PRIVATE_KEY", {
    expiresIn: "1d",
  });
  // Sign the access token
  // const access_token = signJwt({ sub: userid }, 'accessTokenPrivateKey', {
  //   expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
  // });

  // Sign the refresh token
  // const refresh_token = signJwt({ sub: userid }, 'refreshTokenPrivateKey', {
  //   expiresIn: `${config.get<number>('refreshTokenExpiresIn')}m`,
  // });

  // Create a Session
  // redisClient.set(user._id, JSON.stringify(user), {
  //   EX: 60 * 60,
  // });

  // Return access token
  return { access_token, refresh_token };
};
