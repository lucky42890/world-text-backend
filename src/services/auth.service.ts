import * as jwt from 'jsonwebtoken';
import { DataStoredInToken } from '../interfaces/auth.interface';

class AuthService {

  public createToken(acronym: string): string {
    const dataStoredInToken: DataStoredInToken = { acronym: acronym };
    const secret: string = process.env.JWT_SECRET;
    const expiresIn: number = 60 * 60;

    return jwt.sign(dataStoredInToken, secret, { expiresIn });
  }
}

export default AuthService;
