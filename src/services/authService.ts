import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Auth } from "../models/auth";
import { UserRepository } from "../repositories/userRepository";
import { UserDTO } from "../models/user";

const SECRET = process.env.secret;
const userRepository = new UserRepository;

export class AuthService {
    getToken(user: UserDTO) {
        const token = jwt.sign({id: user.id}, `${SECRET}`, { expiresIn: '10d'});
        return token;
    }

    async login({email, password}: Auth) {
        const user = await userRepository.selectOne({ email });

        if (!user) throw Error('Usuário não encontrado!');
    
        if (!bcrypt.compare(user.password, password)) throw Error('Senha incorreta!');
    
        const token = this.getToken(user);
        const { name } = user;
        return { token, userData: { name, email }}
    }
}