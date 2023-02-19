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

    async addAnnouncement({ licensePlate, vehicle, price, socialLink, advertiserId, endDistrict, endStreet, endCity, endState, endCep, startDistrict, startStreet, startCity, startState, startCep, date, image }: AnnouncementDTO): Promise<AnnouncementDTO> {

        const id = advertiserId;
        const user = await this.userRepository.selectOne({ id })

        if (!user) throw new Error('Anunciante não encontrado');

        const addAnnouncement = await this.announcementRepository.create({ 
            licensePlate, 
            vehicle, 
            price, 
            socialLink, 
            advertiserId,
            endDistrict,
            endStreet,
            endCity,
            endState,
            endCep,
            startDistrict,
            startStreet,
            startCity,
            startState,
            startCep,
            date,
            image,
        });
        return addAnnouncement;
    }

    async updateAnnouncement({
        licensePlate,
        vehicle,
        price,
        socialLink,
        advertiserId,
        endDistrict,
        endStreet,
        endCity,
        endState,
        endCep,
        startDistrict,
        startStreet,
        startCity,
        startState,
        startCep,
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
            endDistrict,
            endStreet,
            endCity,
            endState,
            endCep,
            startDistrict,
            startStreet,
            startCity,
            startState,
            startCep,
            date,
            image,
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
