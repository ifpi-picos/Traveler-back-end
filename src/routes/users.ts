import { Request, Response, Router } from 'express';
import { UserRepository } from "../repositories";
import { prisma, PrismaClient } from '@prisma/client';

const usersRouter = Router();
const Prisma = new PrismaClient()
const userRepository = new UserRepository();


usersRouter.post("/", async (req: Request, res: Response) => {
  try{ 
     const {Nome, Email, Senha} = req.body 
    await Prisma.user.create({
      data: {
        nome: Nome, email: Email, senha: Senha
      }
     })
      return res.status(201).send("massa"); 
     
  }
   catch(error: any){

    res.status(400).json(error.message);
  }
});





usersRouter.get("/", (req: Request, res: Response) => {
    return res.status(200);
    // .send(userRepository.findAll());
  });

usersRouter.put("/", (req: Request, res:Response) => {
  return res.status(200).send();
});
usersRouter.delete("/", (req: Request, res:Response) => {
  return res.status(200).send();
});

export default usersRouter;