import { Request, Response, Router, NextFunction } from "express";
import { AddressService } from "../services";
import { IAddressServiceInterface } from "../services/interfaces/addressServiceInterface";
import { AddressRepository } from "../repositories";
import AddressDTO from "../models/address";
import verifyIfNotANumber from "../middleware/verifyIfNotANumber";

const addressService: IAddressServiceInterface = new AddressService(new AddressRepository());
const addressRouter = Router();


addressRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    await verifyIfNotANumber(id, next);

    const address = await addressService.getById(Number(id));
    return res.status(200).json(address);

  } catch (error: any) {
    return res.status(400).json(error.message);
  }

});

addressRouter.post("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { street, state, district, city } = req.body;
    const { id } = req.params;

    if ( !city || !state || !street || !street ) {
      throw new Error ("Algum campo inválido");
    }

    await verifyIfNotANumber(id, next);


    const address = await addressService.addAddress({
      street, 
      state, 
      district, 
      city, 
      id: Number(id),
    } as AddressDTO);

    return res.status(201).json("cadastro completo").json(address);

  } catch (error: any) {
    return res.status(400).json(error.message);
  }
});

addressRouter.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { street, state, district, city } = req.body;
    const { id } = req.params;

    await verifyIfNotANumber(id, next);

    const address = await addressService.updateAddress({ 
      street, 
      state, 
      district, 
      city,
    } as AddressDTO,
    Number(id));

    return res.status(200).json(address);

  } catch (error: any) {
    return res.status(400).json(error.message);
  }
});

addressRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    await verifyIfNotANumber(id, next);

    const msg: string = await addressService.deleteAddress(parseInt(id));
    return res.status(200).send(msg);

  } catch (error: any) {
    return res.status(400).json(error.message);
  }

});

export default addressRouter;
