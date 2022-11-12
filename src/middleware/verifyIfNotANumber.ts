import { NextFunction } from 'express';

export default function verifyIfNotANumber(param: string, next: NextFunction) {
    if(param.indexOf("1" || "2" || "3" || "4" || "5" || "6" || "7" || "8" || "9" || "0") === -1) {
        throw new Error ("O 'id' passado não é um numero!");
    } else {
        next()
    }
}