import { Prisma, User } from "@prisma/client";
import UserDTO, { FirebaseUrl, SecureUser } from "../../models/user";

export interface IUserRepository {
    create(data: UserDTO): Promise<string>;
    updateImage(firebaseUrl: string, id: number): Promise<FirebaseUrl>;
    selectOne(where: Prisma.UserWhereInput): Promise<User | null>;
    update({ name, email, password }: UserDTO, id: number): Promise<SecureUser>;
    delete( id: number ): Promise<string>;
}
