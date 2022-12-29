import { Prisma, PrismaClient, User } from "@prisma/client";
import UserDTO, { FirebaseUrl, SecureUser } from "../models/user";
import { IUserRepository } from "./interfaces/userRepositoryInterface";

export class UserRepository implements IUserRepository {
  private repository: Prisma.UserDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  > = new PrismaClient().user;

  async create(data: UserDTO): Promise<string> {
    await this.repository.create({ data });

    const msg = "cadastro completo";
    return msg;
  }

  async updateImage(firebaseUrl: string, id: number): Promise<FirebaseUrl> {
    const result = await this.repository.update({
      data: {
        image: firebaseUrl,
      },
      where: {
        id,
      },
      select: {
        image: true,
        id: true,
      }
    });

    return result;
  }
  
  async selectOne(where: Prisma.UserWhereInput): Promise<User | null> {
    const result = await this.repository.findFirst({ where });
    return result;
  }

  async update(data: UserDTO, id: number): Promise<SecureUser> {
    const result = await this.repository.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        active: data.active,
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
      }
    });

    return result;
  }

  async delete( id: number ): Promise<string> {
    await this.repository.update({
      where:{
        id,
      },
      data: {
        active: false,
      }
    })
    const msg = "Usuario deletado com sucesso!";
    return msg;
  }
}
