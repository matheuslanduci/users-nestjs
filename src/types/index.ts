export interface IProfile {
  username: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  biography: string;
}

export interface IUser {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
}
