import { Request, Response, Router } from "express";
import { Announcement } from "@prisma/client";
import { UpdateUserDTO } from "../models/updateUser";
import { AnnouncementService } from "../services/announcementService";

const announcementService = new AnnouncementService();
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
    const { veiculo, placa, preco, linkSocial, anuncianteId  } = req.body;

    const announcement = await announcementService.addAnnouncement({ veiculo, placa, preco, linkSocial, anuncianteId  } as Announcement);
    return res.status(201).send("cadastro completo").json(announcement);

  } catch (error: any) {
    return res.status(400).json(error.message);
  }
});

announcementRouter.put("/:id", async (req: Request, res: Response) => {
  const { veiculo, placa, preco, linkSocial, anuncianteId  } = req.body;
  const { id } = req.params;

  try {
    const announcement = await announcementService.updateAnnouncement({ veiculo, placa, preco, linkSocial, anuncianteId  } as Announcement, Number(id));

    return res.status(200).json(announcement);

  } catch (error: any) {
    return res.status(400).json(error.message);
  }
});

announcementRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const msg = await announcementService.deleteAnnouncement(parseInt(id));
    return res.status(200).end(msg);

  } catch (error) {
    return res.status(400).end(error);
  }

});

export default announcementRouter;
