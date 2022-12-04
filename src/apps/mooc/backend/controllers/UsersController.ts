import {
  Body,
  Get,
  Post,
  Put,
  Query,
  Response,
  Route,
  Security,
  SuccessResponse,
  Tags
} from 'tsoa';

import { GetSessionResponse } from '../../../../Contexts/Mooc/Users/Application/GetSession/GetSessionResponse';
import { SearchUsersQuery } from '../../../../Contexts/Mooc/Users/Application/Search/SearchUsersQuery';
import { UsersResponse } from '../../../../Contexts/Mooc/Users/Application/UsersResponse';
import { CreateUserCommand } from '../../../../Contexts/Mooc/Users/Domain/Commands/CreateUserCommand';
import { GetSessionQuery } from '../../../../Contexts/Mooc/Users/Domain/Querys/GetSessionQuery';
import { CommandBus } from '../../../../Contexts/Shared/Domain/CommandBus';
import { QueryBus } from '../../../../Contexts/Shared/Domain/QueryBus';
import container from '../dependency-injection';
import { Controller } from './Controller';
import { ErrorMessage } from './ErrorMessage';
import { SearchController } from './SearchController';

type UserPutBody = {
  id: string;
  email: string;
  password: string;
};

type UserSessionPostRequest = {
  email: string;
  password: string;
};

@Tags('Users')
@Route('v1/users')
export class UsersController extends SearchController implements Controller {
  private readonly commandBus: CommandBus;
  private readonly queryBus: QueryBus;

  constructor() {
    super();
    this.commandBus = container.get('Mooc.Shared.Domain.CommandBus');
    this.queryBus = container.get('Mooc.Shared.Domain.QueryBus');
  }

  @Put()
  @Response<ErrorMessage>(404, 'Invalid user parameters')
  @SuccessResponse(201, 'Created')
  async createUser(@Body() { id, email, password }: UserPutBody): Promise<void> {
    const createCourseCommand = new CreateUserCommand({
      id,
      email,
      password
    });

    return this.commandBus.dispatch(createCourseCommand);
  }

  @Get()
  @Security('jwt')
  @SuccessResponse(200, 'Users list')
  async searchUsers(
    @Query() filters?: any[],
    @Query() orderBy?: string,
    @Query() order?: 'asc' | 'desc',
    @Query() limit?: number,
    @Query() offset?: number
  ) {
    const query = new SearchUsersQuery(
      this.parseFilters(filters || []),
      orderBy,
      order,
      limit ? Number(limit) : undefined,
      offset ? Number(offset) : undefined
    );

    const res = await this.queryBus.ask<UsersResponse>(query);
    return res.users;
  }

  @Get('{id}')
  @SuccessResponse(200, 'Users list')
  async getUser(id: string) {
    const query = new SearchUsersQuery([
      new Map([
        ['field', '_id'],
        ['operator', '='],
        ['value', id]
      ])
    ]);

    const res = await this.queryBus.ask<UsersResponse>(query);

    return res.users[0];
  }

  @Post('/session')
  @Response<ErrorMessage>(404, 'Invalid user parameters')
  @SuccessResponse(201, 'Created')
  async createUserSession(
    @Body() { email, password }: UserSessionPostRequest
  ): Promise<GetSessionResponse> {
    const query = new GetSessionQuery(email, password);
    return this.queryBus.ask<GetSessionResponse>(query);
  }
}
