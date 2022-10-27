import { User, Prisma } from "@prisma/client";
import { UserDTO } from "../../models/user";

export interface IUserRepository {
    create(data: User): Promise<User>;
    selectOne(where: Prisma.UserWhereInput): Promise<User | null>;
    update({ nome, email, endereco, senha }: UserDTO, id: number): Promise<UserDTO>;
    delete( id: number ): Promise<string>;
}
