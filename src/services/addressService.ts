import IAddressServiceInterface from "./interfaces/addressServiceInterface";
import AddressDTO from "../models/address";
import { IAddressRepository } from "../repositories/interfaces/addressRepositoryInterface";
import { Address } from "@prisma/client";
import { IUserRepository } from "../repositories/interfaces/userRepositoryInterface";
import { IAnnouncementRepository } from "../repositories/interfaces/announcementRepositoryInterface";


export class AddressService implements IAddressServiceInterface {
    private addressRepository: IAddressRepository;
    private userRepository: IUserRepository;
    private announcementRepository: IAnnouncementRepository;
    
    constructor(iAddressRepository: IAddressRepository, iUserRepository: IUserRepository, iAnnouncementRepository: IAnnouncementRepository) {
        this.addressRepository = iAddressRepository;
        this.userRepository = iUserRepository;
        this.announcementRepository = iAnnouncementRepository;
    }

    async getByUserId( userId: number ): Promise<AddressDTO> {
        const user = await this.userRepository.selectOne({ id: userId });

        if (!user) throw new Error("Nenhum usuário encontrado");
        if (!user.addressId) throw new Error("Usuário não possui endereço cadastrado.");

        const address = await this.addressRepository.selectOne({id: user.addressId});

        if (!address) throw new Error("Endereço não encontrado.");

        return address;
    }

    async addUserAddress({ city, district, state, street, referencePoint, zipCode }: AddressDTO, userId: number): Promise<AddressDTO> {

        if ( !city || !userId || !state) {
            throw new Error ("Preencha todos os campos obrigatórios.");
        }

        const user = await this.userRepository.selectOne({ id: userId });
        if(user){
            if (user.addressId) throw new Error("Usuário já possui um Endereço.");
        } else throw new Error("Usuário não encontrado.");

        const address = await this.addressRepository.create({
          city,
          district,
          state,
          street,
          referencePoint,
          zipCode,
        } as Address);

        await this.userRepository.update({addressId: address.id, id: userId});
        
        return address;
    }

    async updateAddress({ city, district, state, street, referencePoint, zipCode, startOrEndRoute }: AddressDTO, id: number, isUserAddress: boolean): Promise<AddressDTO | null> {
        let address: AddressDTO | null = null;
        if(isUserAddress){
            const user = await this.userRepository.selectOne({id});
            if(!user) throw new Error ('Usuário não encontrado.');
            if (!user.addressId) throw new Error("Usuário não possui endereço cadastrado.");
    
            address = await this.addressRepository.update({ city, district, state, street, referencePoint, zipCode }, user.addressId);

        } else {
            const announcement = await this.announcementRepository.selectOne({id});
            if(!announcement) throw new Error ('Anúncio não encontrado.');

            if(startOrEndRoute === 'start'){
                if (!announcement.originAddressId) throw new Error("Anúncio não possui endereço cadastrado.");
                address = await this.addressRepository.update({ city, district, state, street, referencePoint, zipCode }, announcement.originAddressId);

            }else if(startOrEndRoute === 'end'){
                if (!announcement.originAddressId) throw new Error("Anúncio não possui endereço cadastrado.");
                address = await this.addressRepository.update({ city, district, state, street, referencePoint, zipCode }, announcement.originAddressId);
            } else{
                throw new Error("Endereço de anúncio não encontrado.")
            }

        }
        return address;
    }

    async deleteAddress( userId: number ): Promise<string> {
        const user = await this.userRepository.selectOne({id: userId});
        if(!user) throw new Error ('Usuário não encontrado.');
        if (!user.addressId) throw new Error("Usuário não possui endereço para ser deletado.");

        const msg = await this.addressRepository.delete( user.addressId );

        return msg;
    }

    async addAnnouncementAddress({city, state, zipCode, referencePoint, district, street}: AddressDTO): Promise<number> {
    console.log('2')
        
        if ( !city || !state || !zipCode) {
            throw new Error ("Preencha todos os campos obrigatórios.");
        }

        const address = await this.addressRepository.create({
          city,
          district,
          state,
          street,
          referencePoint,
          zipCode,
        } as Address);
        
        return address.id;
    }
}
