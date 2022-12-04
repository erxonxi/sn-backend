import { Get, Route, SuccessResponse, Tags } from 'tsoa';

import { Controller } from './Controller';

@Tags('Status')
@Route('v1/status')
export class StatusController implements Controller {
  @Get()
  @SuccessResponse(200, 'Status ok')
  async run() {
    return;
  }
}
