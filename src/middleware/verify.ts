import { Request, Response, Next} from 'express';

export function verifyJWT(req, res, next) {
    const token = req.headers['x-acess-token'];
  
    jwt.verify(token, SECRETO, (err, decoded) => {
      if(err) return res.status(401).end('Você não esta logado!')
  
      req.id = decoded.id;
      next();
    })
  }
  