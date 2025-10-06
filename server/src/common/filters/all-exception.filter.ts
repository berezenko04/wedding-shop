import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { LogService } from '../logging/log.service';

@Catch()
@Injectable()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly logService: LogService) {}

  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let error = 'Internal Server Error';
    let message = 'An unexpected error occurred';
    let details: Record<string, any> | undefined;

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any)?.message || message;
      error = (exceptionResponse as any)?.error || exception.name || error;
      details =
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null &&
        !Array.isArray(exceptionResponse)
          ? { ...exceptionResponse }
          : undefined;
      if (details) delete details.message;
      if (details) delete details.error;
    } else if (exception instanceof Error) {
      message = exception.message;
      error = exception.name;
    }

    const responseBody = {
      timestamp: new Date().toISOString(),
      status,
      error,
      message,
      ...(details && Object.keys(details).length > 0 ? { details } : {}),
    };

    try {
      await this.logService.write({
        level: status >= 500 ? 'ERROR' : status >= 400 ? 'WARN' : 'INFO',
        action: 'http.exception',
        status: String(status),
        message,
        ip: request.ip || (request.headers['x-forwarded-for'] as string),
        userAgent: request.headers['user-agent'],
        metadata: {
          path: request.url,
          method: request.method,
          error: error,
          details: details,
        },
      });
    } catch (logError) {
      this.logger.error(logError);
    }

    response.status(status).json(responseBody);
  }
}
