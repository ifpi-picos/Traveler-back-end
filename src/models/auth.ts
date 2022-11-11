import { UserAuthInfo } from "./user";

export interface Auth {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  userData: UserAuthInfo;
}
