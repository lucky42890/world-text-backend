import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException';
import { DataStoredInToken } from '../interfaces/auth.interface';
import WTFService from '../services/wtf.service';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  const wtfService = new WTFService();

  if (authorization) {
    const secret = process.env.JWT_SECRET;

    try {
      const verificationResponse = jwt.verify(authorization, secret) as DataStoredInToken;
      const acronym = await wtfService.getAcronym(verificationResponse.acronym);

      if (acronym) {
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } catch (error) {
      next(new HttpException(401, 'Wrong authentication token'));
    }
  } else {
    next(new HttpException(401, 'Authentication token missing'));
  }
};

export default authMiddleware;
