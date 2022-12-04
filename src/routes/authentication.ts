import { Router, Request, Response } from "express";
import { AuthService } from "../services";
import IAuthServiceInterface from "../services/interfaces/authServiceInterface";


const authenticationRouter = Router();
const authService: IAuthServiceInterface = new AuthService();

authenticationRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const {token, userData} = await authService.login({ email, password })

    res.cookie('token', token, { maxAge: 5000000, domain: 'traveler-io.netlify.app', httpOnly: true, sameSite: 'none', secure: true})

    return res.status(201).json({ auth: true, user: userData });
    
  } catch (error: any) {
    return res.status(401).json({ auth: false, token: null, message: error.message});
  }
  
})

authenticationRouter.post('/recoverPassword', (req: Request, res: Response) => {
  res.send('senha recuperada');
})

export default authenticationRouter;
