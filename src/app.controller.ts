import { Controller, Get, Post, Req, Res } from "@nestjs/common";
import { AppService } from "./app.service";
import { IProfile } from "./types";
import { Request, Response } from "express";
import { hash, compare } from "bcrypt";
import { generateToken } from "./utils/tokenUtils";
import { JsonWebTokenError } from "jsonwebtoken";
import {
  validateStringField,
  validatePasswordField,
  validateDateField
} from "./utils/validateFields";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/profiles")
  async getProfiles(@Res() res: Response): Promise<IProfile[] | Response<any>> {
    try {
      const profiles = await this.appService.findProfiles();

      return res.json(profiles);
    } catch (error) {
      return res.status(500).json({ error: "Server error. Try again." });
    }
  }

  @Get("/profile/:id")
  async getProfileById(
    @Req() req: Request,
    @Res() res: Response
  ): Promise<IProfile | Response<any>> {
    try {
      const profile = await this.appService.findOneProfile(
        parseInt(req.params.id)
      );

      return res.json(profile);
    } catch (error) {
      return res.status(500).json({ error: "Server error. Try again." });
    }
  }

  @Post("/users/reg")
  async insertUser(
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    try {
      const { username, password, firstName, lastName, birthDate } = req.body;

      if (!validateStringField(username)) {
        return res
          .status(400)
          .json({ error: "Invalid username. Provide a valid username." });
      }
      if (!validatePasswordField(password)) {
        return res
          .status(400)
          .json({ error: "Invalid password. Provide a valid password." });
      }
      if (!validateStringField(firstName)) {
        return res
          .status(400)
          .json({ error: "Invalid first name. Provide a valid name." });
      }
      if (!validateStringField(lastName)) {
        return res
          .status(400)
          .json({ error: "Invalid last name. Provide a valid name." });
      }
      if (!validateDateField(birthDate)) {
        return res
          .status(400)
          .json({ error: "Invalid birth date. Provide a valid birth date." });
      }

      const newPassword = await hash(password, 8);

      const newBirthDate = new Date(birthDate);

      await this.appService.createUser({
        username,
        password: newPassword,
        firstName,
        lastName,
        birthDate: newBirthDate
      });

      const token = generateToken(username);

      return res.json({
        username,
        token
      });
    } catch (error) {
      return res.status(500).json({ error: "Server error. Try again." });
    }
  }

  @Post("/user/auth")
  async authenticateUser(@Req() req: Request, @Res() res: Response) {
    try {
      const { username, password } = req.body;

      if (!validateStringField(username)) {
        return res
          .status(400)
          .json({ error: "Invalid username. Provide a valid username." });
      }
      if (!validatePasswordField(password)) {
        return res
          .status(400)
          .json({ error: "Invalid password. Provide a valid password." });
      }

      const user = await this.appService.findOneUser(username);

      if (!user) {
        return res.status(400).json({ error: "User not found." });
      }

      if (!(await compare(password, user.password))) {
        return res.status(400).json({ error: "Password do not match." });
      }

      const token = generateToken(username);

      return res.json({
        username,
        token
      });
    } catch (error) {
      return res.status(500).json({ error: "Server error. Try again." });
    }
  }

  @Post("/bio/update")
  async updateBiography(@Req() req: Request, @Res() res: Response) {
    try {
      const { username, bio } = req.body;

      if (!bio) {
        return res
          .status(400)
          .json({ error: "Invalid biography. Provide a valid biography." });
      }

      await this.appService.updateBiography(bio, username);

      return res.json({ bio });
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        return res
          .status(400)
          .json({ error: "Invalid token. Provide a valid token." });
      }
      return res.status(500).json({ error: "Server error. Try again." });
    }
  }
}
