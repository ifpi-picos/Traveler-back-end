import { Request, Response, Router } from "express";
import { UserService } from "../services";
import { UserRepository } from "../repositories";
import { IUserServiceInterface } from "../services/interfaces/userServiceInterface";
import UserDTO from "../models/user";


const usersRouter = Router();
const userService: IUserServiceInterface = new UserService(new UserRepository());

usersRouter.post("/cadastro", async (req: Request, res: Response) => {
  try {
    const { name, email, password, address } = req.body;

    await userService.addUser({ name, email, password, address })

    return res.status(201).send("cadastro completo");
  } catch (error: any) {
    res.status(400).json(error);
  }
});

usersRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await userService.getById( Number(id) )

    res.status(200).json(user)
  } catch (error) {
    res.status(400).json(error)
  }
});

usersRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const { name, email, address, password } = req.body;
    const { id } = req.params;

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
    res.status(400).json(error);
  }

});
export default usersRouter;
