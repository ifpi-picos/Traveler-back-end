import { Prisma } from "@prisma/client";
import AnnouncementDTO, { filterAnnouncement } from "../../models/annoucement";

export interface IAnnouncementRepository{
  findMany(): Promise<AnnouncementDTO[]>;
  findByFilter(where: Prisma.AnnouncementWhereInput): Promise<AnnouncementDTO[]>;
  findBy2Filters(data: filterAnnouncement): Promise<AnnouncementDTO[]>;
  findByAllFilters(data: filterAnnouncement): Promise<AnnouncementDTO[]>
  create(data: AnnouncementDTO): Promise<AnnouncementDTO>;
  selectOne(where: Prisma.UserWhereInput): Promise<AnnouncementDTO | null>;
  update(data: AnnouncementDTO, id: number): Promise<AnnouncementDTO>;
  delete( id: number ): Promise<string>;
}
