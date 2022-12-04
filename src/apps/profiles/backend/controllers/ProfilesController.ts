import { Get, Response, Route, SuccessResponse, Tags } from 'tsoa';
import { Profile } from '../../../../Contexts/Profiles/Profiles/Domain/Profile';
import { GetProfileQuery } from '../../../../Contexts/Profiles/Profiles/Domain/Query/GetProfileQuery';

import { Primitives } from '../../../../Contexts/Shared/Domain/Primitives';
import { QueryBus } from '../../../../Contexts/Shared/Domain/QueryBus';
import container from '../dependency-injection';
import { Controller } from './Controller';
import { ErrorMessage } from './ErrorMessage';
import { SearchController } from './SearchController';

@Tags('Profiles')
@Route('v1/profiles')
export class ProfilesController extends SearchController implements Controller {
  private readonly queryBus: QueryBus;

  constructor() {
    super();
    this.queryBus = container.get<QueryBus>('Profiles.Shared.Domain.QueryBus');
  }

  @Get('users/{id}')
  @Response<ErrorMessage>(404, 'Invalid parameters')
  @SuccessResponse(200)
  async getProfile(id: string): Promise<Primitives<Profile>> {
    const query = new GetProfileQuery(id);
    return await this.queryBus.ask(query);
  }
}
