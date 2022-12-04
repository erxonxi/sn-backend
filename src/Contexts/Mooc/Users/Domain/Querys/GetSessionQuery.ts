import { Query } from '../../../../Shared/Domain/Query';

export class GetSessionQuery implements Query {
  readonly email: string;
  readonly password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
