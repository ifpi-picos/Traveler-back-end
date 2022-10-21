import { UpdateUserDTO } from "../../models/updateUser"
import { UserRepository } from "../../repositories";

const userRepository = new UserRepository();

async function updateUser({ nome, email, endereco }: UpdateUserDTO, id: number) {
    const userExists = await userRepository.selectOne({ id });

    if (!userExists) throw new Error("Usuario não encontrado!");

    const user = await userRepository.update({ nome, email, endereco }, id)

    return user;
}


export default updateUser;