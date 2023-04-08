import AddressDTO from "../../models/address";


export default interface IAddressServiceInterface {
    getByUserId( id: number ): Promise<AddressDTO>;
    addUserAddress({ state, street, district, city }: AddressDTO, userId: number): Promise<AddressDTO>;
    updateAddress({ city, district, state, street }: AddressDTO, id: number, isUserAddress: boolean): Promise<AddressDTO | null>;
    deleteAddress( id: number ): Promise<string>;
    addAnnouncementAddress({city, state, zipCode, referencePoint, district, street}: AddressDTO): Promise<number>;
}
