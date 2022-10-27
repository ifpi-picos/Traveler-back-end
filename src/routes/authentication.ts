import { Router, Request, Response } from 'express';
// import { UserRepository } from '../repositories';
//byscript

// const SECRETO = 'bumbaMeuBoi';
const authenticationRouter = Router();
// const userRepository = new UserRepository;

authenticationRouter.post('/login', async (req: Request, res: Response) => {
  // try {
  //   const { email, senha } = req.body;

  //   const usuarioExist = await userRepository.selectOne({ email });

  //   if (!usuarioExist) throw Error('Usuário não encontrado!');

  //   if (usuarioExist.senha !== senha) throw Error('Senha incorreta!');

  //   const token = jwt.sign({usuarioExist.id}, SECRETO, {expireIn: 600});
  //   return res.status(201).json({ auth: true, token} );

  // } catch (error: any) {
  //   return res.status(401).json(error.message);
  // }
  
  res.json('usuario logado');
})

// function verifyJWT(req, res, next) {
//   const token = req.headers['x-acess-token'];

//   jwt.verify(token, SECRETO, (err, decoded) => {
//     if(err) return res.status(401).end('Você não esta logado!')

//     req.id = decoded.id;
//     next();
//   })
// }

authenticationRouter.post('/recoverPassword', (req: Request, res: Response) => {
  res.json('senha recuperada');
})

export default authenticationRouter;
