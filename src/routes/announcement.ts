import { Request, Response, Router } from "express";
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

announcementRouter.post("/filter", async (req: Request, res: Response) => {
  try {
    const { date, endRoute, startRoute } = req.body;

    if (!date && !endRoute && !startRoute) throw new Error('Nenhum filtro informado.');

    let dateConvertido;
    if (date) {
      const smashDate = date.split('/');
    
      const day = smashDate[0];
      const month = smashDate[1];
      const year = smashDate[2];

      verifyIfNotANumber(day);
      verifyIfNotANumber(month);
      verifyIfNotANumber(year);

      if (day > 31 || month > 12) throw new Error ("Informe uma data válida.");

      dateConvertido = new Date(`${year}/${month}/${day}`);
    }

    const announcements = await announcementService.findAnnouncementByFilter({ dateConvertido, endRoute, startRoute });
    return res.status(200).json(announcements);

  } catch (error: any) {
    return res.status(400).json(error.message);
  }

});

announcementRouter.post("/", async (req: Request, res: Response) => {
  try {
    let { vehicle, licensePlate, price, socialLink, advertiserId, startRoute, endRoute, date  } = req.body;

    if ( !advertiserId || !socialLink || !licensePlate || !vehicle || !date || !endRoute || !startRoute ) {
      throw new Error ("Algum campo inválido");
    }

    verifyIfNotANumber(advertiserId);
    verifyIfNotANumber(price);

    price = Number(price);
    advertiserId = Number(advertiserId);
    
    const smashDate = date.split('/');
    
    const day = smashDate[0];
    const month = smashDate[1];
    const year = smashDate[2];

    verifyIfNotANumber(day);
    verifyIfNotANumber(month);
    verifyIfNotANumber(year);

    if (day > 31 || month > 12) throw new Error ("Informe uma data válida.");

    const dateConvertido = new Date(`${year}/${month}/${day}`);

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

    return res.status(201).json(announcement);

  } catch (error: any) {
    return res.status(400).json(error.message);
  }
});

announcementRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    let { vehicle, licensePlate, price, socialLink, advertiserId, startRoute, endRoute, date } = req.body;
    const { id } = req.params;
    const smashDate = date.split('/');

    verifyIfNotANumber(id);
    verifyIfNotANumber(price);
    verifyIfNotANumber(advertiserId);

    
    let dateConvertido;
    if(date){
    
      const day = smashDate[0];
      const month = smashDate[1];
      const year = smashDate[2];

      verifyIfNotANumber(day);
      verifyIfNotANumber(month);
      verifyIfNotANumber(year);

      if (day > 31 || month > 12) throw new Error ("Informe uma data válida.");
      
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

announcementRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    verifyIfNotANumber(id);

    const msg: string = await announcementService.deleteAnnouncement(parseInt(id));
    return res.status(200).json(msg);

  } catch (error: any) {
    return res.status(400).json(error.message);
  }

});

export default announcementRouter;
