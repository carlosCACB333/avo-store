import { jwtVerify, SignJWT } from 'jose';
import { config } from '../config';

export const jwtSign = async (uid: number) => {
  return await new SignJWT({ id: uid })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('2h')
    .sign(new TextEncoder().encode(config.secret));
};

export const verifyToken = async (berer: string) => {
  try {
    const token = berer.replace('Bearer ', '');
    return await jwtVerify(token, new TextEncoder().encode(config.secret));
  } catch (error) {
    console.log(error);
  }
};
