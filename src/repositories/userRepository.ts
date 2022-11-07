import { Prisma, PrismaClient, User } from "@prisma/client";
import UserDTO from "../models/user";
import { IUserRepository } from "./interfaces/userRepositoryInterface";

export class UserRepository implements IUserRepository {
  private repository: Prisma.UserDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  > = new PrismaClient().user;

  async create(data: UserDTO): Promise<User> {
    const result = await this.repository.create({ data });
    return result;
  }
  
  async selectOne(where: Prisma.UserWhereInput): Promise<User | null> {
    const result = await this.repository.findFirst({ where });
    return result;
  }

  async update({ name, email, address, password }: UserDTO, id: number): Promise<UserDTO> {
    const result = await this.repository.update({
      where: { id },
      data: {
        name,
        email,
        address,
        password,
      },
    });
    return result;
  }

  async delete( id: number ): Promise<string> {
    await this.repository.delete({
      where:{
        id,
      }
    })
    const msg = "usuario deletado com sucesso!";
    return msg;
  }
}
