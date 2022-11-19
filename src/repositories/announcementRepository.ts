import { IAnnouncementRepository } from "./interfaces/announcementRepositoryInterface";
import { Prisma, PrismaClient } from "@prisma/client";
import AnnouncementDTO, { filterAnnouncement } from "../models/annoucement";

export class AnnouncementRepository implements IAnnouncementRepository {
    private repository: Prisma.AnnouncementDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  > = new PrismaClient().announcement;

  async findMany(): Promise<AnnouncementDTO[]>{
    const result = await this.repository.findMany();
    return result;
  }

  findByFilter(where: Prisma.AnnouncementWhereInput): Promise<AnnouncementDTO[]> {
    const result = this.repository.findMany({ where })
    return result;
  }

  //testar se filtra so com 2 dados informados, se sim, nao precisa das outras funções
  findBy2Filters(data: filterAnnouncement): Promise<AnnouncementDTO[]> {
    const result = this.repository.findMany({
      where: {
        date: data.dateConvertido,
        endRoute: data.endRoute,
        startRoute: data.startRoute,
      }
    })
    return result;
  }

  findByAllFilters(data: filterAnnouncement): Promise<AnnouncementDTO[]> {
    const result = this.repository.findMany({
      where: {
        date: data.dateConvertido,
        endRoute: data.endRoute,
        startRoute: data.startRoute,
      }
    })
    return result;
  }


  async create(data: AnnouncementDTO): Promise<AnnouncementDTO> {
    const result = await this.repository.create({ data });
    return result;
  }

  async selectOne(where: Prisma.AnnouncementWhereInput): Promise<AnnouncementDTO | null> {
    const result = await this.repository.findFirst({ where });
    return result;
  }

  async update({ vehicle, licensePlate, price, socialLink, advertiserId, startRoute, endRoute, date }: AnnouncementDTO, id: number): Promise<AnnouncementDTO> {
    const result = await this.repository.update({
      where: { id },
      data: {
        vehicle,
        licensePlate,
        price,
        socialLink,
        advertiserId,
        startRoute,
        endRoute,
        date,
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
        const result = "Usuario deletado com sucesso!"
        return result;
      }
}
