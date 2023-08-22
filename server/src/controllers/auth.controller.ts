const config = require("config");
import { CookieOptions, NextFunction, Request, Response } from "express";
import { GoogleUserResult } from "../services/session.service";
import {
  createUser,
  findAndUpdateUser,
  findUser,
  findUserById,
  signToken,
} from "../services/user.service";
import AppError from "../utils/appError";
const jwt = require("jsonwebtoken");

// Exclude this fields from the response
export const excludedFields = ["password"];

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
const clientId = process.env.CLIENT_ID;

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

async function verifyGoogleToken(token: any) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientId,
    });
    return { payload: ticket.getPayload() };
  } catch (error) {
    return { error: "Invalid user detected. Please try again" };
  }
}

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("log");
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);
      console.log("login", verificationResponse);
      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile: GoogleUserResult = verificationResponse?.payload;

      var email = profile.email;
      var name = profile.name;
      var picture = profile.picture;

      console.log("email", email);
      const user = await findAndUpdateUser(
        { email },
        {
          name,
          photo: picture,
          email,
          provider: "Google",
          verified: true,
        },
        { upsert: true, runValidators: false, new: true, lean: true }
      );
      console.log("userid", user?._id);
      const secret = process.env.CLIENT_SECRET;
      res.status(201).json({
        message: "Login was successful",
        user: {
          id: user?._id,
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          picture: profile?.picture,
          email: profile?.email,
          token: jwt.sign({ email: profile?.email }, secret, {
            expiresIn: "1d",
          }),
        },
      });
    }
  } catch (error) {
    console.log("error", error);
  }
};
