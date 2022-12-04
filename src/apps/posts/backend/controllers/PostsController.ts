import { Body, Get, Put, Request, Response, Route, Security, SuccessResponse, Tags } from 'tsoa';
import { CreatePostCommand } from '../../../../Contexts/Posts/Posts/Domain/Command/CreatePostCommand';
import { GetUserPostsQuery } from '../../../../Contexts/Posts/Posts/Domain/Query/GetUserPostsQuery';

import { CommandBus } from '../../../../Contexts/Shared/Domain/CommandBus';
import { QueryBus } from '../../../../Contexts/Shared/Domain/QueryBus';
import container from '../dependency-injection';
import { AthenticatedRequest, Controller } from './Controller';
import { ErrorMessage } from './ErrorMessage';
import { SearchController } from './SearchController';

type FollowBody = {
  id: string;
  profileName: string;
  message: string;
};

@Tags('Posts')
@Route('v1/posts')
export class PostsController extends SearchController implements Controller {
  private readonly commandBus: CommandBus;
  private readonly queryBus: QueryBus;

  constructor() {
    super();
    this.commandBus = container.get('Posts.Shared.Domain.CommandBus');
    this.queryBus = container.get('Posts.Shared.Domain.QueryBus');
  }

  @Put()
  @Security('jwt')
  @Response<ErrorMessage>(404, 'Invalid post parameters')
  @SuccessResponse(201, 'Created')
  async createPost(
    @Body() { id, profileName, message }: FollowBody,
    @Request() req: AthenticatedRequest
  ): Promise<void> {
    const session = req.user;

    const command = new CreatePostCommand(id, session.user.id, profileName, message);

    return this.commandBus.dispatch(command);
  }

  @Get('users/{userId}')
  @Response<ErrorMessage>(404, 'Invalid post parameters')
  @SuccessResponse(200, 'Created')
  async getUserPosts(userId: string): Promise<any> {
    const query = new GetUserPostsQuery(userId);

    return await this.queryBus.ask(query);
  }
}
