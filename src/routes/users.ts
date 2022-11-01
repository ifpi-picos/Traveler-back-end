import { Request, Response, Router } from "express";
import { UserRepository } from "../repositories";
import { UserService } from "../services/userService";
import { User } from "@prisma/client";
import { UserDTO } from "../models/user";
import byscript from "bcryptjs";


const usersRouter = Router();
const userRepository = new UserRepository();
const userService = new UserService();

usersRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const secretPassword = byscript.hashSync(password, 8);

    const userExists = await userRepository.selectOne({ email });
    if (userExists) throw new Error("Usuario ja cadastrado");

    await userRepository.create({
      name,
      email,
      password: secretPassword,
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
  const { name, email, address, password } = req.body;
  const { id } = req.params;

  try {
    const user = await userService.updateUser({ name, email, address, password } as UserDTO, Number(id));

    return res.status(200).json(user);

  } catch (error: any) {
    res.status(400).json(error);
  }
});

usersRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const msg = await userService.deleteUser(parseInt(id));

    res.status(200).end(msg);
  } catch (error) {
    res.status(400).end(error);
  }

});
export default usersRouter;
