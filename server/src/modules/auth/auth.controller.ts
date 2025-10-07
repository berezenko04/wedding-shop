import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

// services
import { AuthService } from './auth.service';

// dto
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

// guards
import { JwtRefreshGuard } from './guards/refresh.guard';

// decorators
import { IpAddress } from './decorators/ip.decorator';
import { User } from 'src/common/decorators/user.decorator';

// utils
import { getDeviceInfo } from 'src/utils/getDeviceInfo';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  @Throttle({ default: { limit: 2, ttl: 60000 } })
  async register(@Body() dto: RegisterDto) {
    await this.authService.register(dto);
    return { message: 'Registration is successful' };
  }

  @Post('login')
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
    @IpAddress() ip: string,
  ) {
    const { accessToken, refreshToken, userId } =
      await this.authService.login(dto);

    const userAgent = req.headers['user-agent'] || 'unknown';

    const { os, deviceType, browser } = getDeviceInfo(userAgent);

    await this.authService.createSession({
      userId,
      refreshToken,
      ip: ip === '::1' ? '127.0.0.1' : String(ip),
      userAgent,
      os,
      deviceType,
      browser,
      expiresAt: new Date(
        Date.now() +
          parseInt(this.configService.get<string>('JWT_REFRESH_EXPIRY')!),
      ),
    });

    const isProd = this.configService.get<string>('NODE_ENV') === 'production';

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'strict' : 'lax',
      maxAge: isProd
        ? parseInt(this.configService.get<string>('JWT_ACCESS_EXPIRY')!)
        : 15 * 24 * 60 * 60 * 1000,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'strict' : 'lax',
      maxAge: parseInt(this.configService.get<string>('JWT_REFRESH_EXPIRY')!),
    });

    return { message: 'Login successful' };
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  async refresh(
    @User() userId: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { accessToken, refreshToken } =
        await this.authService.refreshTokens(userId, req.cookies?.refreshToken);

      const isProd =
        this.configService.get<string>('NODE_ENV') === 'production';

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? 'strict' : 'lax',
        maxAge: isProd
          ? parseInt(this.configService.get<string>('JWT_ACCESS_EXPIRY')!)
          : 30 * 24 * 60 * 60 * 1000,
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? 'strict' : 'lax',
        maxAge: parseInt(this.configService.get<string>('JWT_REFRESH_EXPIRY')!),
      });

      return { message: 'Refresh successful' };
    } catch {
      throw new UnauthorizedException('Token refresh failed');
    }
  }

  @Post('forgot-password')
  @Throttle({ default: { limit: 1, ttl: 60000 } })
  async forgotPassword(@Body('email') email: string) {
    await this.authService.sendForgotPasswordOtp(email);
    return { message: 'Reset password mail has been send' };
  }

  @Post('verify-otp')
  @Throttle({ default: { limit: 3, ttl: 180000 } })
  async verifyOtp(@Body() dto: VerifyOtpDto) {
    const resetToken = await this.authService.verifyOtp(dto);
    return { resetToken, message: 'Token is valid' };
  }
}
