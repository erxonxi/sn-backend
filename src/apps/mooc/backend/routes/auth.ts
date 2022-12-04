import { Request } from 'express';
import { UserSession } from '../../../../Contexts/Mooc/Users/Domain/UserSession';
import { Uuid } from '../../../../Contexts/Shared/Domain/value-object/Uuid';
import { JwtEncrypt } from '../../../../Contexts/Shared/Infrastructure/Encrypt/JwtEncrypt';
import container from '../dependency-injection';

type SessionType = {
  id: string;
  user: { id: string; email: string };
  expiration: string;
  iat: number;
  exp: number;
};

export class UnauthorizedError extends Error {}

export function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'test') {
      resolve(
        new UserSession(Uuid.random().toString(), {
          id: Uuid.random().toString(),
          email: 'sonia@mail.com'
        })
      );
    }

    const encrypter: JwtEncrypt = container.get('Shared.Crypt.JwtEncrypt');
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      reject(new UnauthorizedError('No token provided'));
    }

    const token = authHeader?.split(' ')[1];
    if (!token) {
      reject(new UnauthorizedError('No token provided'));
    }

    const sessionData = encrypter.verify<SessionType>(token!);
    if (!sessionData) {
      reject(new UnauthorizedError('No token provided'));
    }

    const session = new UserSession(sessionData!.id, sessionData!.user, sessionData!.expiration);
    if (session.isExired()) {
      reject(new UnauthorizedError('No token provided'));
    }

    resolve(session);
  });
}
