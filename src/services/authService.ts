import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import IAuthServiceInterface from "./interfaces/authServiceInterface";
import { Auth, AuthResponse } from "../models/auth";
import UserDTO from "../models/user";
import { UserRepository } from "../repositories/userRepository";

const SECRET = process.env.secret;
const userRepository = new UserRepository();

export class AuthService implements IAuthServiceInterface {
  getToken(user: UserDTO): string {
    const token = jwt.sign({ id: user.id }, `${SECRET}`, { expiresIn: "10d" });
    return token;
  }

  async login({ email, password }: Auth): Promise<AuthResponse> {
    const user = await userRepository.selectOne({ email });

    if (!user) throw Error("Usuário não encontrado!");

    const equalsPassword = bcrypt.compareSync(password,user.password);

    if (!equalsPassword) throw Error("Senha incorreta!");
    

    const token = this.getToken(user);
    const { name } = user;
    return { token, userData: { name, email } };
  }
}
