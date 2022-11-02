import { Router, Request, Response } from 'express';
import { AuthService } from '../services/authService';

const authenticationRouter = Router();
const authService = new AuthService();

authenticationRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const {token, userData} = await authService.login({ email, password })

    res.cookie('token', token, { maxAge: 5000000, httpOnly: true, sameSite: false, secure: true})

    return res.status(201).json({ auth: true, user: userData });
    
  } catch (error: any) {
    return res.status(401).send({ auth: false, tuken: null, message: error});
  }
  
})

authenticationRouter.post('/recoverPassword', (req: Request, res: Response) => {
  res.json('senha recuperada');
})

export default authenticationRouter;
