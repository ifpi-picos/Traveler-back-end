import { IAddressServiceInterface } from "./interfaces/addressServiceInterface";
import AddressDTO from "../models/address";
import { IAddressRepository } from "../repositories/interfaces/addressRepositoryInterface";


export class AddressService implements IAddressServiceInterface {
    private addressRepository: IAddressRepository;

    constructor(iAddressRepository: IAddressRepository) {
        this.addressRepository = iAddressRepository;
    }

    async getById( id: number ): Promise<AddressDTO> {
        const address = await this.addressRepository.selectOne({ id });

        if (!address) throw new Error("Nenhum endereço cadastrado!");

        return address;
    }

    async addAddress({ city, district, state, street, id }: AddressDTO): Promise<string> {

        if ( !city || !district || !street || !id || !state) {
            throw new Error ("Preencha todos os campos obrigatórios.");
        }

        const addressExists = await this.addressRepository.selectOne({ id });
        if (addressExists) throw new Error("Usuário ja possui um Endereço.");

        const address = await this.addressRepository.create({
          city,
          district,
          state,
          street,
          id,
        } as AddressDTO);
        
        return address;
    }

    async updateAddress({ city, district, state, street }: AddressDTO, id: number): Promise<AddressDTO> {

        const address = await this.addressRepository.update({ city, district, state, street }, id)

        return address;
    }

    async deleteAddress( id: number ): Promise<string> {
        const addressExists = await this.addressRepository.selectOne({ id })

        if (!addressExists) throw new Error("Usuário não possui endereço para ser deletado.");

        const msg = await this.addressRepository.delete( id )

        return msg;
    }
}
