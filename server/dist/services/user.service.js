"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signToken = exports.findUserProfileById = exports.createUserProfile = exports.findAndUpdateUser = exports.findUser = exports.findAllUsers = exports.findUserById = exports.createUser = void 0;
const lodash_1 = require("lodash");
const user_model_1 = __importDefault(require("../models/user.model"));
const userprofile_model_1 = __importDefault(require("../models/userprofile.model"));
const auth_controller_1 = require("../controllers/auth.controller");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// CreateUser service
const createUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.create(input);
    return (0, lodash_1.omit)(user.toJSON(), auth_controller_1.excludedFields);
});
exports.createUser = createUser;
// Find User by Id
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(id).lean();
    return (0, lodash_1.omit)(user, auth_controller_1.excludedFields);
});
exports.findUserById = findUserById;
// Find All users
const findAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.find();
});
exports.findAllUsers = findAllUsers;
// Find one user by any fields
const findUser = (query, options = {}) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findOne(query, {}, options).select("+password");
});
exports.findUser = findUser;
const findAndUpdateUser = (query, update, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield user_model_1.default.findOneAndUpdate(query, update, options);
    }
    catch (error) {
        console.log("findAndUpdateUser", error);
    }
});
exports.findAndUpdateUser = findAndUpdateUser;
// CreateUser service
const createUserProfile = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userprofile_model_1.default.create(input);
    return (0, lodash_1.omit)(user.toJSON(), auth_controller_1.excludedFields);
});
exports.createUserProfile = createUserProfile;
// Find User by Id
const findUserProfileById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userprofile_model_1.default.findById(id).lean();
    return (0, lodash_1.omit)(user, auth_controller_1.excludedFields);
});
exports.findUserProfileById = findUserProfileById;
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
const signToken = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const access_token = jsonwebtoken_1.default.sign({ email }, "ACCESS_TOKEN_PRIVATE_KEY", {
        expiresIn: "1d",
    });
    const refresh_token = jsonwebtoken_1.default.sign({ email }, "REFRESH_TOKEN_PRIVATE_KEY", {
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
});
exports.signToken = signToken;
//# sourceMappingURL=user.service.js.map