import { Controller, Get } from '@nestjs/common';

// services
import { UserService } from './user.service';

// decorators
import { User } from 'src/common/decorators/user.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async get(@User() userId: string) {
    return this.userService.get(userId);
  }
}
