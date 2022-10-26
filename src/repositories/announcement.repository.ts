import { IAnnouncementRepository } from "./interfaces/announcement.repository.interface";
import { Prisma, PrismaClient } from "@prisma/client";

export class AnnouncementRepository implements IAnnouncementRepository {
    private repository: Prisma.AnnouncementDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  > = new PrismaClient().announcement;
    async delete( id: number ): Promise<string> {
        await this.repository.delete({
          where:{
            id,
          }
        })
        return "usuario deletado com sucesso!"
      }
}
