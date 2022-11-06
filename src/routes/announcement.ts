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
    return res.status(400).json(error);
  }

});

announcementRouter.post("/", async (req: Request, res: Response) => {
  try {
    let { vehicle, licensePlate, price, socialLink, advertiserId  } = req.body;

    price = Number(price);
    advertiserId = Number(advertiserId);

    const announcement = await announcementService.addAnnouncement({ vehicle, licensePlate, price, socialLink, advertiserId  } as Announcement);
    return res.status(201).send("cadastro completo").json(announcement);

  } catch (error: any) {
    return res.status(400).json(error);
  }
});

announcementRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    let { vehicle, licensePlate, price, socialLink, advertiserId  } = req.body;
    const { id } = req.params;

    price = Number(price);
    advertiserId = Number(advertiserId);

    const announcement = await announcementService.updateAnnouncement({ vehicle, licensePlate, price, socialLink, advertiserId  } as Announcement, Number(id));

    return res.status(200).json(announcement);

  } catch (error: any) {
    return res.status(400).json(error);
  }
});

announcementRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const msg: string = await announcementService.deleteAnnouncement(parseInt(id));
    return res.status(200).send(msg);

  } catch (error) {
    return res.status(400).send(error);
  }

});

export default announcementRouter;
