import { Query } from '../../../../Shared/Domain/Query';
import { QueryHandler } from '../../../../Shared/Domain/QueryHandler';
import { GetSessionQuery } from '../../Domain/Querys/GetSessionQuery';
import { UserEmail } from '../../Domain/UserEmail';
import { UserPassword } from '../../Domain/UserPassword';
import { GetSession } from './GetSession';
import { GetSessionResponse } from './GetSessionResponse';

export class GetSessionQueryHandler implements QueryHandler<GetSessionQuery, GetSessionResponse> {
  constructor(private service: GetSession) {}

  subscribedTo(): Query {
    return GetSessionQuery;
  }

  handle(query: GetSessionQuery): Promise<GetSessionResponse> {
    const email = new UserEmail(query.email);
    const password = new UserPassword(query.password);
    return this.service.run({ email, password });
  }
}
