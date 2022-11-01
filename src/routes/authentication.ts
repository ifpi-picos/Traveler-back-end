import { Router, Request, Response } from 'express';
import { UserRepository } from '../repositories';
import byscript from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = 'bumbaMeuBoi';
const authenticationRouter = Router();
const userRepository = new UserRepository;

authenticationRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const userExist = await userRepository.selectOne({ email });

    if (!userExist) throw Error('Usuário não encontrado!');

    if (!byscript.compare(userExist.password, password)) throw Error('Senha incorreta!');

    const token = jwt.sign({id: userExist.id}, SECRET, { expiresIn: '10d'});
    return res.status(201).json({ auth: true, token} );

  } catch (error: any) {
    return res.status(401).json(error);
  }
  
  res.json('usuario logado');
})

authenticationRouter.post('/recoverPassword', (req: Request, res: Response) => {
  res.json('senha recuperada');
})

export default authenticationRouter;
