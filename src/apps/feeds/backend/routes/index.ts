import { Request, Response, Router } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import httpStatus from 'http-status';
import swaggerUi from 'swagger-ui-express';
import { ValidateError } from 'tsoa';

import { UserNotFound } from '../../../../Contexts/Mooc/Users/Domain/Errors/UserNotFound';
import { InvalidArgumentError } from '../../../../Contexts/Shared/Domain/value-object/InvalidArgumentError';
import { UnauthorizedError } from '../../../mooc/backend/routes/auth';
import swaggerDocument from '../swagger.json';
import { RegisterRoutes } from './routes';

export function registerRoutes(router: Router) {
  router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  RegisterRoutes(router);
  router.use(function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: any
  ): Response | void {
    if (err instanceof UserNotFound) {
      return res.status(404).json({
        message: err.message
      });
    }
    if (err instanceof InvalidArgumentError) {
      return res.status(404).json({
        message: err.message
      });
    }
    if (err instanceof UnauthorizedError) {
      return res.status(401).json({
        message: err.message
      });
    }
    if (err instanceof ValidateError) {
      return res.status(422).json({
        message: 'Validation Failed',
        details: err.fields
      });
    }
    if (err instanceof Error) {
      return res.status(500).json({
        message: err.message || 'Internal Server Error'
      });
    }

    next();
  });
}

export function validateReqSchema(req: Request, res: Response, next: any) {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    return next();
  }
  const errors = validationErrors.array().map((err: ValidationError) => ({ [err.param]: err.msg }));

  return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
    errors
  });
}
