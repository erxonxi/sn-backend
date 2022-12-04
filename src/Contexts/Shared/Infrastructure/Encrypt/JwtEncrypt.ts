import jwt from 'jsonwebtoken';
import JwtConfig from './JwtConfig';

export class JwtEncrypt {
  private secret: string;

  constructor(config: JwtConfig) {
    this.secret = config.secret;
  }

  encrypt(data: object): string {
    return jwt.sign(data, this.secret, { expiresIn: 60 * 60 * 24 });
  }

  verify<D>(token: string): D | undefined {
    try {
      return jwt.verify(token, this.secret) as D;
    } catch {
      return undefined;
    }
  }
}
