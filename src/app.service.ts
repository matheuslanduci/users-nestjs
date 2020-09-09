import { Injectable } from "@nestjs/common";
import { ConfigService } from "./config.service";
import { IProfile, IUser } from "./types";

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  public findOneUser(username: string): Promise<IUser> {
    return this.configService
      .queryBuilder<IUser>("users")
      .select("*")
      .where("username", username)
      .first();
  }

  public findProfiles(): Promise<IProfile[]> {
    return this.configService
      .queryBuilder<IProfile>("users")
      .select(["username", "firstName", "lastName", "birthDate", "biography"]);
  }

  public findOneProfile(id: number): Promise<IProfile> {
    return this.configService
      .queryBuilder<IProfile>("users")
      .select(["username", "firstName", "lastName", "birthDate", "biography"])
      .where("id", id)
      .first();
  }

  public createUser({
    username,
    password,
    firstName,
    lastName,
    birthDate
  }: IUser): Promise<void> {
    return this.configService
      .queryBuilder<IUser>("users")
      .insert({ username, password, firstName, lastName, birthDate });
  }

  public async updateBiography(
    bio: string,
    username: string
  ): Promise<void> {
    await this.configService
      .queryBuilder<IProfile>("users")
      .update({ biography: bio })
      .where("username", username);
  }
}
