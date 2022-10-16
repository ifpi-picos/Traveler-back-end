import { Request, Response, Router } from "express";
import { UserRepository } from "../repositories";
import { prisma, PrismaClient, User } from "@prisma/client";

const usersRouter = Router();
const Prisma = new PrismaClient();
const userRepository = new UserRepository();

usersRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { nome, email, senha } = req.body;

    const userExists = await userRepository.selectOne({ email });
    if (userExists) throw new Error("Usuario ja cadastrado");

    await userRepository.create({
      nome,
      email,
      senha,
    } as User);
    return res.status(201).send("cadastro completo");
  } catch (error: any) {
    res.status(400).json(error.message);
  }
});



usersRouter.get("/", (req: Request, res: Response) => {
  return res.status(200);
  // .send(userRepository.findAll());
});

usersRouter.put("/", (req: Request, res: Response) => {
  return res.status(200).send();
});
usersRouter.delete("/", (req: Request, res: Response) => {
  return res.status(200).send();
});

export default usersRouter;
