import { Request, Response, Router } from "express";
import { AddressService } from "../services";
import IAddressServiceInterface from "../services/interfaces/addressServiceInterface";
import { AddressRepository, UserRepository } from "../repositories";
import AddressDTO from "../models/address";
import { verifyIfNotANumber } from "../middleware";

const addressService: IAddressServiceInterface = new AddressService(new AddressRepository(), new UserRepository());
const addressRouter = Router();


addressRouter.get("/user/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    verifyIfNotANumber(userId);

    const address = await addressService.getByUserId(Number(userId));
    return res.status(200).json(address);

  } catch (error: any) {
    return res.status(400).json(error.message);
  }

});

addressRouter.post("/user/:userId", async (req: Request, res: Response) => {
  try {
    const { street, state, district, city, zipCode, referencePoint } = req.body;
    const { userId } = req.params;

    verifyIfNotANumber(userId);


    const address = await addressService.addUserAddress({
      street, 
      state, 
      district, 
      city,
      referencePoint,
      zipCode
    } as AddressDTO,
    Number(userId),
    );

    return res.status(201).json(address);

  } catch (error: any) {
    return res.status(400).json(error.message);
  }
});

addressRouter.put("/user/:userId", async (req: Request, res: Response) => {
  try {
    const { street, state, district, city } = req.body;
    const { userId } = req.params;

    verifyIfNotANumber(userId);

    const address = await addressService.updateAddress({ 
      street, 
      state, 
      district, 
      city,
    } as AddressDTO,
    Number(userId));

    return res.status(200).json(address);

  } catch (error: any) {
    return res.status(400).json(error.message);
  }
});

addressRouter.delete("/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    verifyIfNotANumber(userId);

    const msg: string = await addressService.deleteAddress(parseInt(userId));
    return res.status(200).json(msg);

  } catch (error: any) {
    return res.status(400).json(error.message);
  }

});

export default addressRouter;
