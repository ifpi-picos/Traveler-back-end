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
    
    async findAnnouncement({convertedDate, startCity, endCity, advertiserId}: filterAnnouncement): Promise<AnnouncementDTO[]>{
        if (!startCity) startCity = undefined;
        if (!endCity) endCity = undefined;
        
        const Announcements = await this.announcementRepository.findMany({convertedDate, endCity, startCity, advertiserId});
        return Announcements;
    }

    async addAnnouncement({ licensePlate, vehicle, price, socialLink, advertiserId, date, image, vacancy, destinationAddressId, originAddressId }: AnnouncementDTO): Promise<AnnouncementDTO> {

        const id = advertiserId;
        const user = await this.userRepository.selectOne({ id })

        if (!user) throw new Error('Anunciante não encontrado');

        const addAnnouncement = await this.announcementRepository.create({ 
            licensePlate, 
            vehicle, 
            price, 
            socialLink, 
            advertiserId,
            date,
            image,
            vacancy,
            originAddressId,
            destinationAddressId,
        });
        return addAnnouncement;
    }

    async updateAnnouncement({
        licensePlate,
        vehicle,
        price,
        socialLink,
        advertiserId,
        date,
        image
    }: AnnouncementDTO, id: number): Promise<AnnouncementDTO> {
        await this.verifyAnnouncementExist(id);

        const updateAnnouncement = await this.announcementRepository.update({
            licensePlate,
            vehicle,
            price,
            socialLink,
            advertiserId,
            date,
            image,
            vacancy: 0,
            originAddressId: 0,
            destinationAddressId: 0
        }, 
        id);
        return updateAnnouncement;
    }

    async deleteAnnouncement( id: number ): Promise<string> {

        await this.verifyAnnouncementExist(id);

        const msg = await this.announcementRepository.delete( id );

        return msg;
    }

    async verifyAnnouncementExist(id: number): Promise<AnnouncementDTO> {
        const announcementExist = await this.announcementRepository.selectOne({ id });

        if (!announcementExist) throw new Error("Anúncio não encontrado!");

        return announcementExist;
    }

}
