import { Prisma, PrismaClient, User } from "@prisma/client";
import { UpdateUserDTO } from "../models/updateUser";
import { IUserRepository } from "./interfaces/user.repository.interface";

export class UserRepository implements IUserRepository {
  private repository: Prisma.UserDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  > = new PrismaClient().user;
  async create(data: User): Promise<User> {
    const result = await this.repository.create({ data });
    return result;
  }
  
  async selectOne(where: Prisma.UserWhereInput): Promise<User | null> {
    const result = await this.repository.findFirst({ where });
    return result;
  }

  async update({ nome, email, endereco, senha }: UpdateUserDTO, id: number): Promise<UpdateUserDTO> {
    const result = await this.repository.update({
      where: { id },
      data: {
        nome,
        email,
        endereco,
        senha,
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
    return "usuario deletado com sucesso!"
  }
}
