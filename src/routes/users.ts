import { Request, Response, Router } from "express";
import { UserRepository } from "../repositories";
import updateUser from "../services/user/updateUserService";
import deleteUser from "../services/user/deleteUserService";
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

usersRouter.put("/:id", async (req: Request, res: Response) => {
  const { nome, email } = req.body;
  const { id } = req.params;

  try{
  const updateUser = await updateUser({ name, email, id });
  return res.status(200).json(updateUser);
  } catch (error => {
    res.status(400).json(error.message);
  })

});

usersRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try{
  await deleteUser({ id });

  return res.status(200).send("Usuário deletado com sucesso!");
  } catch (error => {
    res.status(400).json(error.message);
  })
});

export default usersRouter;
