import { IAnnouncementRepository } from "./interfaces/announcementRepositoryInterface";
import { Prisma, PrismaClient } from "@prisma/client";
import AnnouncementDTO, { filterAnnouncement } from "../models/annoucement";

export class AnnouncementRepository implements IAnnouncementRepository {
    private repository: Prisma.AnnouncementDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  > = new PrismaClient().announcement;

  async findMany(data: filterAnnouncement): Promise<AnnouncementDTO[]>{
    const result = await this.repository.findMany({
      where: {
        date: data.convertedDate,
        endCity: data.endCity,
        startCity: data.startCity,
        advertiserId: data.advertiserId,
      }
    });
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

  async update({ vehicle,
    licensePlate,
    price,
    socialLink,
    advertiserId,
    endDistrict,
    endStreet,
    endCity,
    endState,
    endCep,
    startDistrict,
    startStreet,
    startCity,
    startState,
    startCep,
    date,
    image
  }: AnnouncementDTO, id: number): Promise<AnnouncementDTO> {
    const result = await this.repository.update({
      where: { id },
      data: {
        vehicle,
        licensePlate,
        price,
        socialLink,
        advertiserId,
        endDistrict,
        endStreet,
        endCity,
        endState,
        endCep,
        startDistrict,
        startStreet,
        startCity,
        startState,
        startCep,
        date,
        image,
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
        const result = "Anúncio deletado com sucesso!"
        return result;
      }
}
