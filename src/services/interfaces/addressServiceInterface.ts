import AddressDTO from "../../models/address";


export default interface IAddressServiceInterface {
    getById( id: number ): Promise<AddressDTO>;
    addAddress({ id, state, street, district, city }: AddressDTO): Promise<AddressDTO>;
    updateAddress({ city, district, state, street }: AddressDTO, id: number): Promise<AddressDTO>;
    deleteAddress( id: number ): Promise<string>;
}
