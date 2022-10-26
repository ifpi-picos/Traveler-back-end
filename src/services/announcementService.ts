import { AnnouncementRepository } from "../repositories";
import { Announcement } from "@prisma/client";

const announcementRepository = new AnnouncementRepository;

export class AnnouncementService {
    async findALLAnnouncement(): Promise<Announcement[]>{
        const Announcements = await announcementRepository.findMany();
        return Announcements;
    }

    async addAnnouncement({ placa, veiculo, preco, linkSocial, anuncianteId }: Announcement): Promise<Announcement> {
        const addAnnouncement = await announcementRepository.create({ placa, veiculo, preco, linkSocial, anuncianteId });
        return addAnnouncement;
    }

    async updateAnnouncement({ placa, veiculo, preco, linkSocial, anuncianteId }: Announcement, id: number) {
        const announcementExist = await announcementRepository.selectOne({ id });

        if (!announcementExist) throw new Error("Usuario não encontrado!");

        const updateAnnouncement = await announcementRepository.update({ placa, veiculo, preco, linkSocial, anuncianteId }, id);
        return updateAnnouncement;
    }

    async deleteAnnouncement( id: number ) {

        const announcementExist = await announcementRepository.selectOne({ id });

        if (!announcementExist) throw new Error("Usuario não encontrado!");

        const msg = await announcementRepository.delete( id );

        return msg;
    }

}
