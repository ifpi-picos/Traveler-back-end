import { Prisma, PrismaClient, Address } from "@prisma/client";
import AddressDTO from "../models/address";
import { IAddressRepository } from "./interfaces/addressRepositoryInterface";

export class AddressRepository implements IAddressRepository {
  private repository: Prisma.AddressDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  > = new PrismaClient().address;

  async create(data: Address): Promise<Address> {
    console.log('data:', data);
    const result = await this.repository.create({ data });
    console.log('result:', result);


    return result;
  }
  
  async selectOne(where: Prisma.AddressWhereInput): Promise<Address | null> {
    const result = await this.repository.findFirst({ where });
    return result;
  }

  async update(data: AddressDTO, id: number): Promise<AddressDTO> {
    const result = await this.repository.update({
      where: { id },
      data: {
        street: data.street,
        district: data.district,
        city: data.city,
        state: data.state,
      },
    });

    return result;
  }

  async delete( id: number ): Promise<string> {
    await this.repository.delete({
      where:{
        id,
      }
    })
    const msg = "Endereço deletado com sucesso!";
    return msg;
  }
}
