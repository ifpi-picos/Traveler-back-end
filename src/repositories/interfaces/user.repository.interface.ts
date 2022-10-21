import { User, Prisma } from "@prisma/client";
import { UpdateUserDTO } from "../../models/updateUser";

export interface IUserRepository {
  create(data: User): Promise<User>;
  selectOne(where: Prisma.UserWhereInput): Promise<User | null>;
  update({ nome, email, endereco, id}: UpdateUserDTO): Promise<UpdateUserDTO>;
}
