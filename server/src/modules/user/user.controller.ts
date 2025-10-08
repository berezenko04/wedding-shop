import { Body, Controller, Get, Patch, Req } from '@nestjs/common';
import { Request } from 'express';

// services
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';

// decorators
import { User } from 'src/common/decorators/user.decorator';
import { Auth } from '../auth/decorators/auth.decorator';

// dto
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@Auth()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async get(@User('id') userId: string) {
    return this.userService.get(userId);
  }

  @Patch()
  async update(@User('id') userId: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(userId, dto);
  }

  @Get('sessions')
  async getSessions(@User('id') userId: string, @Req() req: Request) {
    const refreshToken = req.cookies['refreshToken'];
    return this.authService.getSessions(userId, refreshToken);
  }
}
