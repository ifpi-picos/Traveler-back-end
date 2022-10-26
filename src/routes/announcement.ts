import { Request, Response, Router } from "express";
import { Announcement } from "@prisma/client";
import { UpdateUserDTO } from "../models/updateUser";

const announcementRouter = Router();

announcementRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { nome, email, senha } = req.body;

    const userExists = await annoucementRepository.selectOne({ email });
    if (userExists) throw new Error("Usuario ja cadastrado");

    await announcementRepository.create({
      veiculo,
      placa,
      preco,
      linkSocial,
    } as Announcement);
    return res.status(201).send("cadastro completo");
  } catch (error: any) {
    res.status(400).json(error.message);
  }
});

announcementRouter.get("/", (req: Request, res: Response) => {
  return res.status(200);
  // .send(userRepository.findAll());
});

announcementRouter.put("/:id", async (req: Request, res: Response) => {
  const { nome, email, endereco, senha } = req.body;
  const { id } = req.params;

  try {
    const user = await updateUser({ nome, email, endereco, senha } as UpdateUserDTO, Number(id));

    return res.status(200).json(user);

  } catch (error: any) {
    res.status(400).json(error.message);
  }
});

announcementRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const msg = await deleteUser(parseInt(id));

    res.status(200).end(msg);
  } catch (error) {
    res.status(400).end(error);
  }

});

export default announcementRouter;
