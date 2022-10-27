import { UserDTO } from "../models/user"
import { UserRepository } from "../repositories";

const userRepository = new UserRepository();

export class UserService {

    async updateUser({ nome, email, endereco, senha }: UserDTO, id: number) {
        const userExists = await userRepository.selectOne({ id });

        if (!userExists) throw new Error("Usuario não encontrado!");

        const user = await userRepository.update({ nome, email, endereco, senha }, id)

        return user;
    }

    async deleteUser( id: number ) {
        const userExists = await userRepository.selectOne({ id })

        if (!userExists) throw new Error("Usuario não encontrado!");

        const user = await userRepository.delete( id )

        return user;
    }
}