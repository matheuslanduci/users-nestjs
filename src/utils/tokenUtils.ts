import { sign, verify } from "jsonwebtoken";

require("dotenv").config();

export function generateToken(username: string): string {
  return sign({ username: username }, process.env.SECRET_TOKEN, {
    expiresIn: process.env.SECRET_TOKEN_EXPIRES
  });
}

export function validateToken(token: string, username: string): boolean {
  const verifiedToken: any = verify(token, process.env.SECRET_TOKEN);

  if (verifiedToken.username !== username) {
    return false;
  }

  return true;
}
