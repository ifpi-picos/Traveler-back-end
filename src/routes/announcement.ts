/* eslint-disable prefer-const */
import { Request, Response, Router } from "express";
import { Announcement } from "@prisma/client";
import { AnnouncementService, VehicleImageService } from "../services";
import { IAnnouncementServiceInterface } from "../services/interfaces/announcementServiceInterface";
import IVehicleImageService from "../services/interfaces/vehicleImageServiceInterface";
import { AnnouncementRepository, UserRepository } from "../repositories";
import AnnouncementDTO from "../models/annoucement";
import { verifyIfNotANumber, verifyIfPastDate } from "../middleware";
import Multer from "multer";

const multer = Multer({
  storage: Multer.memoryStorage(),
});

const announcementService: IAnnouncementServiceInterface =
  new AnnouncementService(new AnnouncementRepository(), new UserRepository());
const vehicleImageService: IVehicleImageService = new VehicleImageService()
const announcementRouter = Router();

announcementRouter.get("/", async (req: Request, res: Response) => {
  try {
    const { date, endRoute, startRoute } = req.query;
    let userId = req.query.userId;

    let dateConvertido: Date | null = null;
    if (date) {
      const stringDate = String(date);
      const smashDate = stringDate.split("-");

      const day = verifyIfNotANumber(smashDate[2]);
      const month = verifyIfNotANumber(smashDate[1]);
      const year = verifyIfNotANumber(smashDate[0]);

      if (day > 31 || month > 12) throw new Error("Informe uma data válida.");

      dateConvertido = new Date(`${year}/${month}/${day}`)
    }

    let advertiserId: number | null= null;
    if(userId) {
      advertiserId = verifyIfNotANumber(userId as string);
    }

    const announcements = await announcementService.findAnnouncement({
      ...(dateConvertido && { dateConvertido }),
      ...(endRoute && { endRoute: endRoute as string }),
      ...(startRoute && { startRoute: startRoute as string }),
      ...(advertiserId && { advertiserId }),
    })

    return res.status(200).json(announcements);
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
});

announcementRouter.post("/", multer.single("image"), async (req: Request, res: Response) => {
  try {

    const Image = req.file;
    let {
      vehicle,
      licensePlate,
      price,
      socialLink,
      advertiserId,
      startRoute,
      endRoute,
      date,
    } = req.body;

    if (
      !advertiserId ||
      !socialLink ||
      !licensePlate ||
      !vehicle ||
      !date ||
      !endRoute ||
      !startRoute ||
      !Image
    ) {
      throw new Error("Algum campo inválido");
    }

    verifyIfNotANumber(advertiserId);
    verifyIfNotANumber(price);

    price = Number(price);
    advertiserId = Number(advertiserId);
    const smashDate = date.split("-");

    const day = smashDate[2];
    const month = smashDate[1];
    const year = smashDate[0];

    verifyIfNotANumber(day);
    verifyIfNotANumber(month);
    verifyIfNotANumber(year);

    if (day > 31 || month > 12) throw new Error("Informe uma data válida.");

    verifyIfPastDate(day, month, year);

    const dateConvertido = new Date(`${year}/${month}/${day}`);

    const image = await vehicleImageService.uploadImage(Image);

    const announcement = await announcementService.addAnnouncement({
      vehicle,
      licensePlate,
      price,
      socialLink,
      advertiserId,
      date: dateConvertido,
      startRoute,
      endRoute,
      image
    } as AnnouncementDTO);

    return res.status(201).json(announcement);
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
});

announcementRouter.put("/:id", multer.single("image"), async (req: Request, res: Response) => {
  try {
    const Image = req.file;
    let {
      vehicle,
      licensePlate,
      price,
      socialLink,
      advertiserId,
      startRoute,
      endRoute,
      date,
    } = req.body;
    const { id } = req.params;

    verifyIfNotANumber(id);
    if(price){
      price = verifyIfNotANumber(price);
    }
    if(advertiserId) {
      advertiserId = verifyIfNotANumber(advertiserId);
    }

    let dateConvertido;
    if (date) {
      const smashDate = date.split("-");

      const day = smashDate[2];
      const month = smashDate[1];
      const year = smashDate[0];

      verifyIfNotANumber(day);
      verifyIfNotANumber(month);
      verifyIfNotANumber(year);

      if (day > 31 || month > 12) throw new Error("Informe uma data válida.");

      verifyIfPastDate(day, month, year);

      dateConvertido = new Date(`${year}/${month}/${day}`);
    }

    let image: string | undefined;
    if (Image) {
      image = await vehicleImageService.uploadImage(Image);
    }

    const announcement = await announcementService.updateAnnouncement(
      {
        vehicle,
        licensePlate,
        price,
        socialLink,
        date: dateConvertido,
        advertiserId,
        startRoute,
        endRoute,
        image,
      } as Announcement,
      Number(id)
    );

    return res.status(200).json(announcement);
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
});

announcementRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    verifyIfNotANumber(id);

    const msg: string = await announcementService.deleteAnnouncement(
      parseInt(id)
    );
    return res.status(200).json(msg);
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
});

export default announcementRouter;
