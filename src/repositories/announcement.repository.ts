import { IAnnouncementRepository } from "./interfaces/announcement.repository.interface";
import { Announcement, Prisma, PrismaClient } from "@prisma/client";
import { AnnouncementDTO } from "../models/annoucement";

export class AnnouncementRepository implements IAnnouncementRepository {
    private repository: Prisma.AnnouncementDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  > = new PrismaClient().announcement;

  async findMany(): Promise<Announcement[]>{
    const result = await this.repository.findMany();
    return result;
  }

  async create(data: Announcement): Promise<Announcement> {
    const result = await this.repository.create({ data });
    return result;
  }

  async selectOne(where: Prisma.UserWhereInput): Promise<Announcement | null> {
    const result = await this.repository.findFirst({ where });
    return result;
  }

  async update({ veiculo, placa, preco, linkSocial }: AnnouncementDTO, id: number): Promise<AnnouncementDTO> {
    const result = await this.repository.update({
      where: { id },
      data: {
        veiculo,
        placa,
        preco,
        linkSocial,
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
