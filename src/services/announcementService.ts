import { AnnouncementRepository, UserRepository } from "../repositories";
import { AnnouncementDTO } from "../models/annoucement";
import { AnnouncementServiceInterface } from "./interfaces/announcementServiceInterface";

const announcementRepository = new AnnouncementRepository;
const userRepository = new UserRepository;

export class AnnouncementService implements AnnouncementServiceInterface{
    async findALLAnnouncement(): Promise<AnnouncementDTO[]>{
        const Announcements = await announcementRepository.findMany();
        return Announcements;
    }

    async addAnnouncement({ licensePlate, vehicle, price, socialLink, advertiserId }: AnnouncementDTO): Promise<AnnouncementDTO> {
        const id = advertiserId;
        const user = await userRepository.selectOne({ id })

        if (!user) throw new Error('Anunciante não encontrado');

        const addAnnouncement = await announcementRepository.create({ licensePlate, vehicle, price, socialLink, advertiserId });
        return addAnnouncement;
    }

    async updateAnnouncement({ licensePlate, vehicle, price, socialLink, advertiserId }: AnnouncementDTO, id: number): Promise<AnnouncementDTO> {
        const announcementExist = await announcementRepository.selectOne({ id });

        if (!announcementExist) throw new Error("Usuario não encontrado!");

        const updateAnnouncement = await announcementRepository.update({ licensePlate, vehicle, price, socialLink, advertiserId }, id);
        return updateAnnouncement;
    }

    async deleteAnnouncement( id: number ): Promise<string> {

        const announcementExist = await announcementRepository.selectOne({ id });

        if (!announcementExist) throw new Error("Usuario não encontrado!");

        const msg = await announcementRepository.delete( id );

        return msg;
    }

}
