import { User, Prisma } from "@prisma/client";
import UserDTO, { SecureUser } from "../../models/user";

export interface IUserRepository {
    create(data: UserDTO): Promise<string>;
    selectOne(where: Prisma.UserWhereInput): Promise<User | null>;
    update({ name, email, address, password }: UserDTO, id: number): Promise<SecureUser>;
    delete( id: number ): Promise<string>;
}
