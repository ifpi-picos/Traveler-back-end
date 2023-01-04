import { Prisma } from "@prisma/client";
import AnnouncementDTO, { filterAnnouncement } from "../../models/annoucement";

export interface IAnnouncementRepository{
  findMany(data: filterAnnouncement): Promise<AnnouncementDTO[]>;
  create(data: AnnouncementDTO): Promise<AnnouncementDTO>;
  selectOne(where: Prisma.AnnouncementWhereInput): Promise<AnnouncementDTO | null>;
  update(data: AnnouncementDTO, id: number): Promise<AnnouncementDTO>;
  delete( id: number ): Promise<string>;
}
