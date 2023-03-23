import IAddressServiceInterface from "./interfaces/addressServiceInterface";
import AddressDTO from "../models/address";
import { IAddressRepository } from "../repositories/interfaces/addressRepositoryInterface";
import { Address } from "@prisma/client";
import { IUserRepository } from "../repositories/interfaces/userRepositoryInterface";


export class AddressService implements IAddressServiceInterface {
    private addressRepository: IAddressRepository;
    private userRepository: IUserRepository;

    constructor(iAddressRepository: IAddressRepository, iUserRepository: IUserRepository) {
        this.addressRepository = iAddressRepository;
        this.userRepository = iUserRepository;
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

    async updateAddress({ city, district, state, street, referencePoint, zipCode }: AddressDTO, userId: number): Promise<AddressDTO> {

        const user = await this.userRepository.selectOne({id: userId});
        if(!user) throw new Error ('Usuário não encontrado.');
        if (!user.addressId) throw new Error("Usuário não possui endereço cadastrado.");
 
        const address = await this.addressRepository.update({ city, district, state, street, referencePoint, zipCode }, user.addressId);

        return address;
    }

    async deleteAddress( userId: number ): Promise<string> {
        const user = await this.userRepository.selectOne({id: userId});
        if(!user) throw new Error ('Usuário não encontrado.');
        if (!user.addressId) throw new Error("Usuário não possui endereço para ser deletado.");

        const msg = await this.addressRepository.delete( user.addressId );

        return msg;
    }
}
