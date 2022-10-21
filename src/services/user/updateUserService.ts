import { UpdateUserDTO } from "../../models/updateUser"
import { UserRepository } from "../../repositories";

const userRepository = new UserRepository();

async function updateUser({ nome, email, endereco, id }: UpdateUserDTO) {
    const userExists = await userRepository.selectOne({ email });

    if (!userExists) throw new Error("Usuario não encontrado!");

    const user = await userRepository.update({ nome, email, endereco, id })

    return user;
};


export default updateUser;
