import { IUserSession } from '../../Domain/UserSession';

export interface GetSessionResponse {
  session: IUserSession;
  token: string;
}
