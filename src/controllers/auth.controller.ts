import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/auth.service';

class AuthController {
  public authService = new AuthService();

  /**
   * Return token for given acronym
   * @param req
   * @param res
   * @param next
   */
  public getToken = (req: Request, res: Response, next: NextFunction) => {
    try {
      const acronym = req.params.acronym;
      const result = this.authService.createToken(acronym);

      res.status(200).json({
        token: result,
      });

    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
