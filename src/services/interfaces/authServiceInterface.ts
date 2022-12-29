import UserDTO from "../../models/user";
import { Auth, AuthResponse } from "../../models/auth";

export default interface IAuthServiceInterface {
  getToken(user: UserDTO): string;
  login({ email, password }: Auth): Promise<AuthResponse>;
  userActive(user: UserDTO): boolean;
}
