import { Address, Prisma } from "@prisma/client";
import AddressDTO from "../../models/address";

export interface IAddressRepository {
    create(data: Address): Promise<Address>;
    selectOne(where: Prisma.UserWhereInput): Promise<Address | null>;
    update({ state, street, district, city }: AddressDTO, id: number): Promise<AddressDTO>;
    delete( id: number ): Promise<string>;
}
