import { UserRepository } from "../repositories";
import { UserServiceInterface } from "./interfaces/userServiceInterface";
import bcrypt from "bcryptjs";
import UserDTO from "../models/user";


const userRepository = new UserRepository();

export class UserService implements UserServiceInterface {

    async getById( id: number ) {
        const user = await userRepository.selectOne( id );

        if (!user) throw new Error("Usuario não encontrado!");

        return user;
    }

    async addUser({ name, email, password }: UserDTO) {

        const userExists = await userRepository.selectOne({ email });
        if (userExists) throw new Error("Usuario ja cadastrado");

        const secretPassword = bcrypt.hashSync(password, 8);

        await userRepository.create({
          name,
          email,
          password: secretPassword,
        } as UserDTO);
    }

    async updateUser({ name, email, address, password }: UserDTO, id: number): Promise<UserDTO> {
        const userExists = await userRepository.selectOne({ id });

        if (!userExists) throw new Error("Usuario não encontrado!");

        const user = await userRepository.update({ name, email, address, password }, id)

        return user;
    }

    async deleteUser( id: number ): Promise<string> {
        const userExists = await userRepository.selectOne({ id })

        if (!userExists) throw new Error("Usuario não encontrado!");

        const msg = await userRepository.delete( id )

        return msg;
    }
}