import { Request, Response, Router } from "express";
import { UserService } from "../services";
import { UserRepository } from "../repositories";
import { IUserServiceInterface } from "../services/interfaces/userServiceInterface";
import UserDTO from "../models/user";


const usersRouter = Router();
const userService: IUserServiceInterface = new UserService(new UserRepository());

function verifyIdNotANumber(id: string) {
  if(id.indexOf("1" || "2" || "3" || "4" || "5" || "6" || "7" || "8" || "9" || "0") === -1) {
      throw new Error ("O 'id' passado não é um numero!");
    }
}

usersRouter.post("/cadastro", async (req: Request, res: Response) => {
  try {
    const { name, email, password, address } = req.body;

    const msg = await userService.addUser({ name, email, password, address })

    return res.status(201).json(msg);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
});

usersRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await verifyIdNotANumber(id);

    const user = await userService.getById( Number(id) );

    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
});

usersRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const { name, email, address, password } = req.body;
    const { id } = req.params;

    await verifyIdNotANumber(id);

    const user = await userService.updateUser({ name, email, address, password } as UserDTO, Number(id));

    return res.status(200).json(user);

  } catch (error: any) {
    res.status(400).json(error.message);
  }
});

usersRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await verifyIdNotANumber(id);

    const msg = await userService.deleteUser(parseInt(id));

    res.status(200).end(msg);
  } catch (error: any) {
    res.status(400).json(error.message);
  }

});
export default usersRouter;
