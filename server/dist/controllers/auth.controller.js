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
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.excludedFields = void 0;
const config = require("config");
const user_service_1 = require("../services/user.service");
const jwt = require("jsonwebtoken");
// Exclude this fields from the response
exports.excludedFields = ["password"];
// Cookie options
// const accessTokenCookieOptions: CookieOptions = {
//   expires: new Date(
//     Date.now() + config.get<number>("accessTokenExpiresIn") * 60 * 1000
//   ),
//   maxAge: config.get<number>("accessTokenExpiresIn") * 60 * 1000,
//   httpOnly: true,
//   sameSite: "lax",
// };
// const refreshTokenCookieOptions: CookieOptions = {
//   expires: new Date(
//     Date.now() + config.get<number>("refreshTokenExpiresIn") * 60 * 1000
//   ),
//   maxAge: config.get<number>("refreshTokenExpiresIn") * 60 * 1000,
//   httpOnly: true,
//   sameSite: "lax",
// };
const { OAuth2Client } = require("google-auth-library");
const clientId = "126611791804-882ill00ssfff57mq6m0df3sujj7knnf.apps.googleusercontent.com";
const client = new OAuth2Client(clientId); //(process.env.CLIENT_ID);
// Only set secure to true in production
// if (process.env.NODE_ENV === "production")
// accessTokenCookieOptions.secure = true;
// Refresh tokens
// const logout = (res: Response) => {
//   res.cookie("access_token", "", { maxAge: 1 });
//   res.cookie("refresh_token", "", { maxAge: 1 });
//   res.cookie("logged_in", "", { maxAge: 1 });
// };
// export const refreshAccessTokenHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // Get the refresh token from cookie
//     const refresh_token = req.cookies.refresh_token as string;
//     // Validate the Refresh token
//     const decoded = verifyJwt<{ sub: string }>(
//       refresh_token,
//       "refreshTokenPublicKey"
//     );
//     const message = "Could not refresh access token";
//     if (!decoded) {
//       return next(new AppError(message, 403));
//     }
//     // Check if the user has a valid session
//     const session = "null"; //await redisClient.get(decoded.sub);
//     if (!session) {
//       return next(new AppError(message, 403));
//     }
//     // Check if the user exist
//     const user = await findUserById(JSON.parse(session)._id);
//     if (!user) {
//       return next(new AppError(message, 403));
//     }
//     // Sign new access token
//     const access_token = signJwt({ sub: user._id }, "accessTokenPrivateKey", {
//       expiresIn: `${config.get<number>("accessTokenExpiresIn")}m`,
//     });
//     // Send the access token as cookie
//     res.cookie("access_token", access_token, accessTokenCookieOptions);
//     res.cookie("logged_in", true, {
//       ...accessTokenCookieOptions,
//       httpOnly: false,
//     });
//     // Send response
//     res.status(200).json({
//       status: "success",
//       access_token,
//     });
//   } catch (err: any) {
//     next(err);
//   }
// };
// export const logoutHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const user = res.locals.user;
//     await redisClient.del(user._id);
//     logout(res);
//     res.status(200).json({ status: "success" });
//   } catch (err: any) {
//     next(err);
//   }
// };
function verifyGoogleToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ticket = yield client.verifyIdToken({
                idToken: token,
                audience: clientId,
            });
            return { payload: ticket.getPayload() };
        }
        catch (error) {
            return { error: "Invalid user detected. Please try again" };
        }
    });
}
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("log");
        if (req.body.credential) {
            const verificationResponse = yield verifyGoogleToken(req.body.credential);
            console.log("login", verificationResponse);
            if (verificationResponse.error) {
                return res.status(400).json({
                    message: verificationResponse.error,
                });
            }
            const profile = verificationResponse === null || verificationResponse === void 0 ? void 0 : verificationResponse.payload;
            var email = profile.email;
            var name = profile.name;
            var picture = profile.picture;
            console.log("email", email);
            const user = yield (0, user_service_1.findAndUpdateUser)({ email }, {
                name,
                photo: picture,
                email,
                provider: "Google",
                verified: true,
            }, { upsert: true, runValidators: false, new: true, lean: true });
            console.log("userid", user === null || user === void 0 ? void 0 : user._id);
            const secret = "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";
            res.status(201).json({
                message: "Login was successful",
                user: {
                    id: user === null || user === void 0 ? void 0 : user._id,
                    firstName: profile === null || profile === void 0 ? void 0 : profile.given_name,
                    lastName: profile === null || profile === void 0 ? void 0 : profile.family_name,
                    picture: profile === null || profile === void 0 ? void 0 : profile.picture,
                    email: profile === null || profile === void 0 ? void 0 : profile.email,
                    token: jwt.sign({ email: profile === null || profile === void 0 ? void 0 : profile.email }, secret, {
                        expiresIn: "1d",
                    }),
                },
            });
        }
    }
    catch (error) {
        console.log("error", error);
    }
});
exports.login = login;
//# sourceMappingURL=auth.controller.js.map