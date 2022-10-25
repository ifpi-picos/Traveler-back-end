import { Request, Response, Router } from "express";
import { UserRepository } from "../repositories";
import updateUser from "../services/user/updateUserService";
import deleteUser from "../services/user/deleteUserService";
import { User } from "@prisma/client";
import { UpdateUserDTO } from "../models/updateUser";


const usersRouter = Router();
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
  const { nome, email, endereco, senha } = req.body;
  const { id } = req.params;

  try {
    const user = await updateUser({ nome, email, endereco, senha } as UpdateUserDTO, Number(id));

    return res.status(200).json(user);

  } catch (error: any) {
    res.status(400).json(error.message);
  }
});

usersRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const msg = await deleteUser(parseInt(id));

    res.status(200).end(msg);
  } catch (error) {
    res.status(400).end(error);
  }

});
export default usersRouter;
