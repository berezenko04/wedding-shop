import { Body, Controller, Get, Patch } from '@nestjs/common';

// services
import { UserService } from './user.service';

// decorators
import { User } from 'src/common/decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('users')
@Auth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async get(@User('id') userId: string) {
    return this.userService.get(userId);
  }

  @Patch()
  async update(@User('id') userId: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(userId, dto);
  }
}
