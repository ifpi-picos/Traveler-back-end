import { Request, Response, Router } from "express";
import { UserService } from "../services";
import { AnnouncementRepository, UserRepository } from "../repositories";
import { IUserServiceInterface } from "../services/interfaces/userServiceInterface";
import UserDTO from "../models/user";
import { verifyIfNotANumber } from "../middleware";


const usersRouter = Router();
const userService: IUserServiceInterface = new UserService(new UserRepository(), new AnnouncementRepository);


usersRouter.post("/cadastro", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const msg = await userService.addUser({ name, email, password })

    return res.status(201).json(msg);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
});

usersRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await verifyIfNotANumber(id);

    const user = await userService.getById( Number(id) );

    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
});

usersRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const { id } = req.params;

    verifyIfNotANumber(id);

    const user = await userService.updateUser({ name, email, password } as UserDTO, Number(id));

    return res.status(200).json(user);

  } catch (error: any) {
    res.status(400).json(error.message);
  }
});

usersRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    verifyIfNotANumber(id);

    const msg = await userService.deleteUser(Number(id));

    res.status(200).end(msg);
  } catch (error: any) {
    res.status(400).json(error.message);
  }

});
export default usersRouter;
