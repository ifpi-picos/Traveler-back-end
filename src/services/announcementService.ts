import AnnouncementDTO, { AnnouncementUpdate, filterAnnouncement } from "../models/annoucement";
import { IAnnouncementServiceInterface } from "./interfaces/announcementServiceInterface";
import { IAnnouncementRepository } from "../repositories/interfaces/announcementRepositoryInterface";
import { IUserRepository } from "../repositories/interfaces/userRepositoryInterface";
import IAddressServiceInterface from "./interfaces/addressServiceInterface";


export class AnnouncementService implements IAnnouncementServiceInterface{
    private announcementRepository: IAnnouncementRepository;
    private userRepository: IUserRepository;
    private addressService: IAddressServiceInterface;

    constructor(iAnnouncementRepository: IAnnouncementRepository, iUserRepository: IUserRepository, iAddressService: IAddressServiceInterface) {
        this.announcementRepository = iAnnouncementRepository;
        this.userRepository = iUserRepository;
        this.addressService = iAddressService;
    }
    
    async findAnnouncement({convertedDate, startCity, endCity, advertiserId}: filterAnnouncement): Promise<AnnouncementDTO[]>{
        if (!startCity) startCity = undefined;
        if (!endCity) endCity = undefined;
        
        const Announcements = await this.announcementRepository.findMany({convertedDate, endCity, startCity, advertiserId});
        return Announcements;
    }

    async getById( id: number ): Promise<AnnouncementDTO> {

        const announcement = await this.announcementRepository.selectOne({ id });

        if (!announcement) throw new Error("Anúncio não encontrado!");

        return announcement;
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
        image,
        endDistrict,
        endStreet,
        endCity,
        endState,
        endReferencePoint,
        startDistrict,
        startStreet,
        startCity,
        startState,
        startReferencePoint,
        startZipCode,
        endZipCode,
    }: AnnouncementUpdate, id: number): Promise<AnnouncementDTO> {
        const announcement = await this.verifyAnnouncementExist(id);

        const isNotUserAddress = false;

        if (endZipCode){
            const destinationAddressId = await this.addressService.updateAddress({
              city: endCity ,
              state: endState,
              district: endDistrict,
              street: endStreet,
              zipCode: endZipCode,
              referencePoint: endReferencePoint,
              startOrEndRoute: 'end',
            },
            id,
            isNotUserAddress);
          }

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
