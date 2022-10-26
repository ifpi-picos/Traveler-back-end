import { UserRepository } from "../../repositories";

const userRepository = new UserRepository;

async function deleteUser( id: number ) {
    const userExists = await userRepository.selectOne({ id })

    if (!userExists) throw new Error("Usuario não encontrado!");

    const user = await userRepository.delete( id )

    return user;
}

export default deleteUser;
