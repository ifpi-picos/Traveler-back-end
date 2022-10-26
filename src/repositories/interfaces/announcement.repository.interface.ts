import { Announcement, Prisma } from "@prisma/client";

export interface IAnnouncementRepository{
  findMany(): Promise<Announcement[]>;
  create(data: Announcement): Promise<Announcement>;
  selectOne(where: Prisma.UserWhereInput): Promise<Announcement | null>;
  update({ veiculo, placa, preco, linkSocial, anuncianteId }: Announcement, id: number): Promise<Announcement>;
  delete( id: number ): Promise<string>;
}