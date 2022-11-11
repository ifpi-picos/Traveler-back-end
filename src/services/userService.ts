import { IUserServiceInterface } from "./interfaces/userServiceInterface";
import bcrypt from "bcryptjs";
import UserDTO from "../models/user";
import { IUserRepository } from "../repositories/interfaces/userRepositoryInterface";


export class UserService implements IUserServiceInterface {
    private userRepository: IUserRepository;

    constructor(iUserRepository: IUserRepository) {
        this.userRepository = iUserRepository;
    }

    async getById( id: number ): Promise<UserDTO> {
        const user = await this.userRepository.selectOne({ id });

        if (!user) throw new Error("Usuario não encontrado!");

        return user;
    }

    async addUser({ name, email, password }: UserDTO) {

        if (email.indexOf("@") === -1 || !name || !email || password.length < 8 || password.length > 20 ) {
            throw new Error ("Algum campo inválido");
        }

        const userExists = await this.userRepository.selectOne({ email });
        if (userExists) throw new Error("Usuario ja cadastrado");

        const secretPassword = bcrypt.hashSync(password, 8);

        await this.userRepository.create({
          name,
          email,
          password: secretPassword,
        } as UserDTO);
    }

    async updateUser({ name, email, address, password }: UserDTO, id: number): Promise<UserDTO> {
        const userExists = await this.userRepository.selectOne({ id });

        if (!userExists) throw new Error("Usuario não encontrado!");

        const user = await this.userRepository.update({ name, email, address, password }, id)

        return user;
    }

    async deleteUser( id: number ): Promise<string> {
        const userExists = await this.userRepository.selectOne({ id })

        if (!userExists) throw new Error("Usuario não encontrado!");

        const msg = await this.userRepository.delete( id )

        return msg;
    }
}