import { IAnnouncementRepository } from "./interfaces/announcementRepositoryInterface";
import { Announcement, Prisma, PrismaClient } from "@prisma/client";
import { AnnouncementDTO } from "../models/annoucement";

export class AnnouncementRepository implements IAnnouncementRepository {
    private repository: Prisma.AnnouncementDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  > = new PrismaClient().announcement;

  async findMany(): Promise<AnnouncementDTO[]>{
    const result = await this.repository.findMany();
    return result;
  }

  async create(data: AnnouncementDTO): Promise<AnnouncementDTO> {
    const result = await this.repository.create({ data });
    return result;
  }

  async selectOne(where: Prisma.UserWhereInput): Promise<AnnouncementDTO | null> {
    const result = await this.repository.findFirst({ where });
    return result;
  }

  async update({ vehicle, licensePlate, price, socialLink, advertiserId }: AnnouncementDTO, id: number): Promise<AnnouncementDTO> {
    const result = await this.repository.update({
      where: { id },
      data: {
        vehicle,
        licensePlate,
        price,
        socialLink,
        advertiserId,
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
