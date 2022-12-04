import { Get, Request, Response, Route, Security, SuccessResponse, Tags } from 'tsoa';
import { Feed } from '../../../../Contexts/Feeds/Feeds/Domain/Feed';
import { GetFeedQuery } from '../../../../Contexts/Feeds/Feeds/Domain/Query/GetFeedQuery';

import { Primitives } from '../../../../Contexts/Shared/Domain/Primitives';
import { QueryBus } from '../../../../Contexts/Shared/Domain/QueryBus';
import container from '../dependency-injection';
import { AthenticatedRequest, Controller } from './Controller';
import { ErrorMessage } from './ErrorMessage';
import { SearchController } from './SearchController';

@Tags('Feeds')
@Route('v1/feeds')
export class FeedsController extends SearchController implements Controller {
  private readonly queryBus: QueryBus;

  constructor() {
    super();
    this.queryBus = container.get<QueryBus>('Feeds.Shared.Domain.QueryBus');
  }

  @Get()
  @Security('jwt')
  @Response<ErrorMessage>(404, 'Invalid parameters')
  @SuccessResponse(200)
  async getFeeds(@Request() req: AthenticatedRequest): Promise<Primitives<Feed>[]> {
    const query = new GetFeedQuery(req.user.user.id);
    return await this.queryBus.ask(query);
  }
}
