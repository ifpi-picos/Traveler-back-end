import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.secret;

export function verifyJWT(req: Request, res: Response, next: NextFunction ) {
  try {
        // const token = req.cookies ? req.cookies.token: null;

    const { authorization } = req.headers;
  // com cookie seria 'token' em vez de 'authorization'
    if (!authorization) {
      return res.status(403).json({
        auth: false, message: 'No token provided.'
      });
    }
    else {
      const [, token] = authorization.split(" ");// localsorage

      const payload = jwt.verify(token, `${SECRET}`);

      if (typeof payload != 'string') {
        req.userId = payload.id;
      
        next();
      }
      else {
        return res.status(500).json({
          auth: false, message: 'Fail to authentication.'
        });
      
      };
    };
  } catch (error) {
    return res.status(500).json({
      auth: false, message: 'Fail to authentication.'
    });
  };

};