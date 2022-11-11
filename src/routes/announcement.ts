import { Request, Response, Router } from "express";
import { Announcement } from "@prisma/client";
import { AnnouncementService } from "../services";
import { IAnnouncementServiceInterface } from "../services/interfaces/announcementServiceInterface";
import { AnnouncementRepository, UserRepository } from "../repositories";

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

announcementRouter.post("/", async (req: Request, res: Response) => {
  try {
    let { vehicle, licensePlate, price, socialLink, advertiserId, date  } = req.body;

    price = Number(price);
    advertiserId = Number(advertiserId);
    const smashDate = date.split('/');
      
    const day = smashDate[0];
    const month = smashDate[1];
    const year = smashDate[2];

    const dateConvertido = new Date( year + '/' + month + '/' + day );

    const announcement = await announcementService.addAnnouncement({
      vehicle, 
      licensePlate, 
      price, 
      socialLink, 
      advertiserId, 
      date: dateConvertido
    } as Announcement);

    return res.status(201).send("cadastro completo").json(announcement);

  } catch (error: any) {
    return res.status(400).json(error.message);
  }
});

announcementRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    let { vehicle, licensePlate, price, socialLink, advertiserId, date } = req.body;
    const { id } = req.params;
    const smashDate = date.split('/');
      
    const day = smashDate[0];
    const month = smashDate[1];
    const year = smashDate[2];

    const dateConvertido = new Date( year + '/' + month + '/' + day );
    price = Number(price);
    advertiserId = Number(advertiserId);

    const announcement = await announcementService.updateAnnouncement({ 
      vehicle, 
      licensePlate, 
      price, 
      socialLink, 
      advertiserId  
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

    const msg: string = await announcementService.deleteAnnouncement(parseInt(id));
    return res.status(200).send(msg);

  } catch (error: any) {
    return res.status(400).json(error.message);
  }

});

export default announcementRouter;
