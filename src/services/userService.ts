import { UserDTO } from "../models/user"
import { UserRepository } from "../repositories";
import { UserServiceInterface } from "./interfaces/userServiceInterface";

const userRepository = new UserRepository();

export class UserService implements UserServiceInterface {

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