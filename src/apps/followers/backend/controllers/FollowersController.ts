import * as express from 'express';
import {
  Body,
  Delete,
  Get,
  Put,
  Request,
  Response,
  Route,
  Security,
  SuccessResponse,
  Tags
} from 'tsoa';
import { FollowCommand } from '../../../../Contexts/Followers/Followers/Domain/Commands/FollowCommand';
import { UnfollowCommand } from '../../../../Contexts/Followers/Followers/Domain/Commands/UnfollowCommand';
import { Follower } from '../../../../Contexts/Followers/Followers/Domain/Follower';
import { GetFollowersOfUserQuery } from '../../../../Contexts/Followers/Followers/Domain/Query/GetFollowersOfUserQuery';

import { CommandBus } from '../../../../Contexts/Shared/Domain/CommandBus';
import { Primitives } from '../../../../Contexts/Shared/Domain/Primitives';
import { QueryBus } from '../../../../Contexts/Shared/Domain/QueryBus';
import container from '../dependency-injection';
import { Controller, SessionType } from './Controller';
import { ErrorMessage } from './ErrorMessage';
import { SearchController } from './SearchController';

type FollowBody = {
  id: string;
  toFollowUserId: string;
};

type UnfollowBody = {
  toUnfollowUserId: string;
};

@Tags('Followers')
@Route('v1/followers')
export class FollowersController extends SearchController implements Controller {
  private readonly commandBus: CommandBus;
  private readonly queryBus: QueryBus;

  constructor() {
    super();
    this.commandBus = container.get<CommandBus>('Followers.Shared.Domain.CommandBus');
    this.queryBus = container.get<QueryBus>('Followers.Shared.Domain.QueryBus');
  }

  @Put()
  @Security('jwt')
  @Response<ErrorMessage>(404, 'Invalid user parameters')
  @SuccessResponse(201, 'Created')
  async follow(
    @Body() { id, toFollowUserId }: FollowBody,
    @Request() req: express.Request
  ): Promise<void> {
    const { user }: { user: SessionType } = req as any;
    const command = new FollowCommand({
      id,
      userId: toFollowUserId,
      followerUserId: user.user.id
    });

    return this.commandBus.dispatch(command);
  }

  @Delete()
  @Security('jwt')
  @Response<ErrorMessage>(404, 'Invalid parameters')
  @SuccessResponse(201, 'Deleted')
  async unfollow(
    @Body() { toUnfollowUserId }: UnfollowBody,
    @Request() req: express.Request
  ): Promise<void> {
    const { user }: { user: SessionType } = req as any;
    const command = new UnfollowCommand({
      userId: toUnfollowUserId,
      followerUserId: user.user.id
    });

    return this.commandBus.dispatch(command);
  }

  @Get('users/{userId}')
  @Response<ErrorMessage>(404, 'Invalid parameters')
  @SuccessResponse(200)
  async getFollowers(userId: string): Promise<Primitives<Follower>[]> {
    const query = new GetFollowersOfUserQuery(userId);
    return await this.queryBus.ask<Primitives<Follower>[]>(query);
  }

  @Get('users/{userId}/count')
  @Response<ErrorMessage>(404, 'Invalid parameters')
  @SuccessResponse(200)
  async getFollowersCount(userId: string): Promise<number> {
    const query = new GetFollowersOfUserQuery(userId);
    const followers = await this.queryBus.ask<Primitives<Follower>[]>(query);
    return followers.length;
  }
}
