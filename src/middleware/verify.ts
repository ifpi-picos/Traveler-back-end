import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface tokenInterface {
     id: number;
  };

const SECRET = process.env.secret;

export function verifyJWT(req: Request, res: Response, next: NextFunction ) {
    const token = req.cookies ? req.cookies.token: null;

    if (!token) {
      return res.status(403).send({
        auth: false, message: 'No token provided.'
      })
    }
  
    jwt.verify(token, `${SECRET}`, (err: any, decoded: any) => {
      if(err) return res.status(500).send({
        auth: false, message: 'Fail to authentication. Error ->' + err
      });
      
      const userId = (decoded as tokenInterface).id;
      
      return userId;
      next();
    })
  }
 