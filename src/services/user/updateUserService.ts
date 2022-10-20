import prisma from "../../dataBase/prismaClient";
import User from "../../models/user"
import { UserRepository } from "../repositories";

interface IRequest {
    name: string;
    email:string;
    id: int;
}

function async updateUser({ name, email, id }: IRequest): Promise<User> {
    const userExists = await UserRepository.selectOne({ id })

    if (!userExists) throw new Error("Usuario não encontrado!");

    const user = await UserRepository.update({ name, email, id }: IRequest)

    return user;
};


export default updateUser;
