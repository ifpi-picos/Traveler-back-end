import { Request, Response, Router, NextFunction } from "express";
import { Announcement } from "@prisma/client";
import { AnnouncementService } from "../services";
import { IAnnouncementServiceInterface } from "../services/interfaces/announcementServiceInterface";
import { AnnouncementRepository, UserRepository } from "../repositories";
import AnnouncementDTO from "../models/annoucement";
import verifyIfNotANumber from "../middleware/verifyIfNotANumber";

const announcementService: IAnnouncementServiceInterface = new AnnouncementService(new AnnouncementRepository(), new UserRepository);
const announcementRouter = Router();


announcementRouter.get("/", async (req: Request, res: Response) => {
  try {
    const announcements = await announcementService.findALLAnnouncement();
    return res.status(200).json(announcements);

  } catch (error: any) {
    return res.status(400).json(error.message);
  }

});

announcementRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { vehicle, licensePlate, price, socialLink, advertiserId, startRoute, endRoute, date  } = req.body;

    if ( !advertiserId || !socialLink || !licensePlate || !vehicle || !date || !endRoute || !startRoute ) {
      throw new Error ("Algum campo inválido");
    }

    await verifyIfNotANumber(advertiserId, next);
    await verifyIfNotANumber(price, next);

    price = Number(price);
    advertiserId = Number(advertiserId);
    const smashDate = date.split('/');
    
    const day = smashDate[0];
    const month = smashDate[1];
    const year = smashDate[2];

    console.log(date);
    const dateConvertido = new Date(`${year}/${month}/${day}`);

    console.log(dateConvertido);

    const announcement = await announcementService.addAnnouncement({
      vehicle, 
      licensePlate, 
      price, 
      socialLink, 
      advertiserId, 
      date: dateConvertido,
      startRoute,
      endRoute,
    } as AnnouncementDTO);

    return res.status(201).json("cadastro completo").json(announcement);

  } catch (error: any) {
    return res.status(400).json(error.message);
  }
});

announcementRouter.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { vehicle, licensePlate, price, socialLink, advertiserId, startRoute, endRoute, date } = req.body;
    const { id } = req.params;
    const smashDate = date.split('/');

    await verifyIfNotANumber(id, next);
    await verifyIfNotANumber(price, next);
    await verifyIfNotANumber(advertiserId, next);
      
    let dateConvertido;
    if(date){
    
      const day = smashDate[0];
      const month = smashDate[1];
      const year = smashDate[2];

      dateConvertido = new Date( `${year}/${month}/${day}` );
    }

    price = Number(price);
    advertiserId = Number(advertiserId);

    const announcement = await announcementService.updateAnnouncement({ 
      vehicle, 
      licensePlate, 
      price, 
      socialLink, 
      date: dateConvertido,
      advertiserId,
      startRoute,
      endRoute,
    } as Announcement,
    Number(id));

    return res.status(200).json(announcement);

  } catch (error: any) {
    return res.status(400).json(error.message);
  }
});

announcementRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    await verifyIfNotANumber(id, next);

    const msg: string = await announcementService.deleteAnnouncement(parseInt(id));
    return res.status(200).send(msg);

  } catch (error: any) {
    return res.status(400).json(error.message);
  }

});

export default announcementRouter;
