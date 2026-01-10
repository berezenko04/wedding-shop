import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

// decorators
import { DEV_ONLY_KEY } from '../decorators/dev-only.decorator';

@Injectable()
export class DevOnlyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isDevOnly = this.reflector.get<boolean>(
      DEV_ONLY_KEY,
      context.getHandler(),
    );

    if (!isDevOnly) return true;

    const env = this.configService.get<string>('NODE_ENV');

    if (env === 'production') {
      throw new ForbiddenException(
        'This action is allowed only in development mode',
      );
    }

    return true;
  }
}
