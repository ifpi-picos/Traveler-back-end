import { Request, Response, Router } from 'express';
import { UserRepository } from "../repositories";

const usersRouter = Router();

const userRepository = new UserRepository();


usersRouter.post("/", (req: Request, res: Response) => {
    return res.status(201).send();
  });

usersRouter.get("/", (req: Request, res: Response) => {
    return res.status(200).send(userRepository.findAll());
  });

usersRouter.put("/", (req: Request, res:Response) => {
  return res.status(200).send();
});
usersRouter.delete("/", (req: Request, res:Response) => {
  return res.status(200).send();
});

export default usersRouter;