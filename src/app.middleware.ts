import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import { validateToken } from "./utils/tokenUtils";
import { validateStringField } from "./utils/validateFields";
import { decode, verify } from "jsonwebtoken";

require("dotenv").config();

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    const Authorization = req.headers.authorization;
    const { username } = req.body;

    if (!validateStringField(username)) {
      return res
        .status(400)
        .json({ error: "Invalid username. Provide a valid username." });
    }    

    if (!Authorization) {
      return res
        .status(400)
        .json({ error: "Invalid auth token. Provide a valid auth token." });
    }

    if (!Authorization.startsWith("Bearer ")) {
      return res
        .status(400)
        .json({ error: "Invalid token. Provide a valid token." });
    }

    const token = Authorization.replace("Bearer ", "");        

    if (!validateToken(token, username)) {
      return res
        .status(400)
        .json({ error: "Invalid token. Provide a valid token." });
    }

    next();
  }
}
