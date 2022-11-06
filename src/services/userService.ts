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
        const user = await this.userRepository.selectOne( id );

        if (!user) throw new Error("Usuario não encontrado!");

        return user;
    }

    async addUser({ name, email, password }: UserDTO) {

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