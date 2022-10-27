import { Request, Response, Router } from "express";
import { Announcement } from "@prisma/client";
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
    let { veiculo, placa, preco, linkSocial, anuncianteId  } = req.body;

    preco = Number(preco);
    anuncianteId = Number(anuncianteId);

    const announcement = await announcementService.addAnnouncement({ veiculo, placa, preco, linkSocial, anuncianteId  } as Announcement);
    return res.status(201).send("cadastro completo").json(announcement);

  } catch (error: any) {
    return res.status(400).json(error);
  }
});

announcementRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    let { veiculo, placa, preco, linkSocial, anuncianteId  } = req.body;
    const { id } = req.params;

    preco = Number(preco);
    anuncianteId = Number(anuncianteId);

    const announcement = await announcementService.updateAnnouncement({ veiculo, placa, preco, linkSocial, anuncianteId  } as Announcement, Number(id));

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
