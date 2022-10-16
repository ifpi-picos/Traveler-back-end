import { Prisma, PrismaClient, User } from "@prisma/client";
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
}


