import { UseGuards } from '@nestjs/common';

// guards
import { JwtAuthGuard } from '../guards/jwt.guard';

export const Auth = () => UseGuards(JwtAuthGuard);
