import { Prisma } from "@prisma/client";
import AnnouncementDTO from "../../models/annoucement";

export interface IAnnouncementRepository{
  findMany(): Promise<AnnouncementDTO[]>;
  findByFilter(): Promise<AnnouncementDTO[]>;
  create(data: AnnouncementDTO): Promise<AnnouncementDTO>;
  selectOne(where: Prisma.UserWhereInput): Promise<AnnouncementDTO | null>;
  update(data: AnnouncementDTO, id: number): Promise<AnnouncementDTO>;
  delete( id: number ): Promise<string>;
}
