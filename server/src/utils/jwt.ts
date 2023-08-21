import jwt, { SignOptions } from 'jsonwebtoken';
const config = require('config');

export const signJwt = (
  payload: Object,
  key: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options: SignOptions = {}
) => {
  const privateKey = Buffer.from("ACCESS_TOKEN_PRIVATE_KEY", 'base64').toString(
    'ascii'
  );
  console.log("privatekey",privateKey)
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export const verifyJwt = <T>(
  token: string,
  key: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
): T | null => {
  try {
    const publicKey = Buffer.from("ACCESS_TOKEN_PUBLIC_KEY", 'base64').toString(
      'ascii'
    );
    return jwt.verify(token, publicKey) as T;
  } catch (error) {
    return null;
  }
};
