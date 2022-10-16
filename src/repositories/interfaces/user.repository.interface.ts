import { User, Prisma } from "@prisma/client";

export interface IUserRepository {
  create(data: User): Promise<User>;
  selectOne(where: Prisma.UserWhereInput): Promise<User | null>;
}
