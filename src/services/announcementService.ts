import AnnouncementDTO, { filterAnnouncement } from "../models/annoucement";
import { IAnnouncementServiceInterface } from "./interfaces/announcementServiceInterface";
import { IAnnouncementRepository } from "../repositories/interfaces/announcementRepositoryInterface";
import { IUserRepository } from "../repositories/interfaces/userRepositoryInterface";


export class AnnouncementService implements IAnnouncementServiceInterface{
    private announcementRepository: IAnnouncementRepository;
    private userRepository: IUserRepository;

    constructor(iAnnouncementRepository: IAnnouncementRepository, iUserRepository: IUserRepository) {
        this.announcementRepository = iAnnouncementRepository;
        this.userRepository = iUserRepository;
    }
    
    async findALLAnnouncement(): Promise<AnnouncementDTO[]>{
        const Announcements = await this.announcementRepository.findMany();
        return Announcements;
    }

    async findAnnouncementByFilter({ dateConvertido, startRoute, endRoute }: filterAnnouncement): Promise<AnnouncementDTO[]>{
       

        // fazer a separaçao dos filtros

        
        const Announcements = await this.announcementRepository.findByFilter();
        return Announcements;
    }

    async addAnnouncement({ licensePlate, vehicle, price, socialLink, advertiserId, startRoute, endRoute, date }: AnnouncementDTO): Promise<AnnouncementDTO> {

        const id = advertiserId;
        const user = await this.userRepository.selectOne({ id })

        if (!user) throw new Error('Anunciante não encontrado');

        const addAnnouncement = await this.announcementRepository.create({ 
            licensePlate, 
            vehicle, 
            price, 
            socialLink, 
            advertiserId,
            startRoute,
            endRoute,
            date,
        });

        return addAnnouncement;
    }

    async updateAnnouncement({ licensePlate, vehicle, price, socialLink, advertiserId, startRoute, endRoute, date }: AnnouncementDTO, id: number): Promise<AnnouncementDTO> {
        const announcementExist = await this.announcementRepository.selectOne({ id });

        if (!announcementExist) throw new Error("Anúncio não encontrado!");

        const updateAnnouncement = await this.announcementRepository.update({ 
            licensePlate, 
            vehicle, 
            price, 
            socialLink, 
            advertiserId,
            startRoute,
            endRoute,
            date,
        }, 
        id);
        return updateAnnouncement;
    }

    async deleteAnnouncement( id: number ): Promise<string> {

        const announcementExist = await this.announcementRepository.selectOne({ id });

        if (!announcementExist) throw new Error("Anúncio não encontrado!");

        const msg = await this.announcementRepository.delete( id );

        return msg;
    }

}
