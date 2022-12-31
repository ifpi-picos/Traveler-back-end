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
    const token = jwt.sign({ id: user.id }, `${SECRET}`, { expiresIn: "1d" });
    return token;
  }

  async login({ email, password }: Auth): Promise<AuthResponse> {
    const user = await userRepository.selectOne({ email });

    if (!user) throw Error("Usuário não encontrado!");
    
    this.userActive(user);

    const equalsPassword = bcrypt.compareSync(password,user.password);

    if (!equalsPassword) throw Error("Senha incorreta!");
    

    const token = this.getToken(user);
    const { name, id } = user;
    return { token, userData: { name, email, id } };
  }

  userActive(user: UserDTO): boolean {
    const active = user.active;
    if(!active) throw new Error("Usuário não encontrado.");
    return active;
  }
}
