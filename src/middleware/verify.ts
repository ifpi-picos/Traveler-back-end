import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.secret;

export default function verifyJWT(req: Request, res: Response, next: NextFunction ) {
    const token = req.cookies ? req.cookies.token: null;

    if (!token) {
      return res.status(403).send({
        auth: false, message: 'No token provided.'
      })
    }
    else {
      const payload = jwt.verify(token, `${SECRET}`);

      if (typeof payload != 'string') {
        req.userId = payload.id;
      
        next();
      }
      else {
        return res.status(500).send({
          auth: false, message: 'Fail to authentication.'
        });
      
      }
    }
}