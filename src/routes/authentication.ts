import { Router, Request, Response } from 'express';

const authenticationRouter = Router();


authenticationRouter.post('/login', (req: Request, res: Response) => {
  res.json('usuario logado');
})


authenticationRouter.post('/recoverPassword', (req: Request, res: Response) => {
  res.json('senha recuperada');
})


export default authenticationRouter;





