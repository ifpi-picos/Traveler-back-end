import { AnnouncementRepository, UserRepository } from "../repositories";
import { AnnouncementDTO } from "../models/annoucement";

const announcementRepository = new AnnouncementRepository;
const userRepository = new UserRepository;

export class AnnouncementService {
    async findALLAnnouncement(): Promise<AnnouncementDTO[]>{
        const Announcements = await announcementRepository.findMany();
        return Announcements;
    }

    async addAnnouncement({ placa, veiculo, preco, linkSocial, anuncianteId }: AnnouncementDTO): Promise<AnnouncementDTO> {
        const id = anuncianteId;
        const user = await userRepository.selectOne({ id })

        if (!user) throw new Error('Anunciante não encontrado');

        const addAnnouncement = await announcementRepository.create({ placa, veiculo, preco, linkSocial, anuncianteId });
        return addAnnouncement;
    }

    async updateAnnouncement({ placa, veiculo, preco, linkSocial, anuncianteId }: AnnouncementDTO, id: number) {
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
