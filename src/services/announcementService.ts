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
 
        const Announcements = await this.announcementRepository.findByFilters({dateConvertido, endRoute, startRoute})
        //separação de filtros
    //     let Announcements;
    //     if (!startRoute && !endRoute) {
    //         Announcements = await this.announcementRepository.findByFilters({ dateConvertido });
    //     } else if (!startRoute && !dateConvertido) {
    //         Announcements = await this.announcementRepository.findByFilters({ endRoute });
    //     } else if (!endRoute && !dateConvertido) {
    //         Announcements = await this.announcementRepository.findByFilters({ startRoute });
    //     } else if (startRoute && endRoute && dateConvertido) {
    //         Announcements = await this.announcementRepository.findByFilters({ startRoute, endRoute, dateConvertido });
    //     } else if (startRoute && dateConvertido) {
    //         Announcements = await this.announcementRepository.findByFilters({ startRoute, dateConvertido });
    //     } else if (endRoute && dateConvertido) {
    //         Announcements = await this.announcementRepository.findByFilters({ endRoute, dateConvertido });
    //     } else if (endRoute && startRoute) {
    //         Announcements = await this.announcementRepository.findByFilters({ endRoute, startRoute });
    //     } else {
    //         throw new Error ("Filtros inválidos");
    //     }

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
